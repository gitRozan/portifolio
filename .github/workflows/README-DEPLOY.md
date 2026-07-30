# Deploy — Hostinger via rsync/SSH

## Por que mudou

O workflow anterior usava `SamKirkland/FTP-Deploy-Action` com `dangerous-clean-slate: true`.

Esse flag **desliga o delta-sync do action**: ele apaga o destino inteiro e reenvia todos os arquivos do `out/` a cada push. São **103 arquivos, 49 deles abaixo de 5 KB**. Cada um vira uma transferência FTPS com handshake TLS, tudo em rajada, do mesmo IP de runner do GitHub. É a assinatura que heurística de rate-limit/DDoS procura.

Somado a isso, não havia `concurrency:` — dois pushes seguidos abriam duas sessões simultâneas contra o mesmo host.

| | Antes (FTPS + clean-slate) | Agora (rsync/SSH) |
|---|---|---|
| Conexões por deploy | ~103 | 1 |
| Arquivos transferidos | 103 (sempre) | só os que mudaram |
| Bytes típicos por deploy | ~4,2 MB | dezenas de KB |
| Deploys simultâneos | possível | bloqueado por `concurrency` |
| Remoção de órfãos | `dangerous-clean-slate` | `rsync --delete` |
| Verificação do host | nenhuma | `ssh-keyscan` → `known_hosts` |

## Secrets necessários

Configure em **Settings → Secrets and variables → Actions**:

| Secret | Exemplo | Onde achar |
|---|---|---|
| `SSH_HOST` | `123.45.67.89` ou `br123.hostinger.com` | hPanel → Avançado → Acesso SSH |
| `SSH_USER` | `u123456789` | mesma tela |
| `SSH_PORT` | `65002` | shared da Hostinger usa 65002, não 22 |
| `REMOTE_PATH` | `/home/u123456789/domains/nicolasbelchior.com/public_html/` | hPanel → Gerenciador de Arquivos |
| `SSH_PRIVATE_KEY` | conteúdo de `~/.ssh/id_ed25519` | gerado abaixo |

## Gerar e registrar a chave

```bash
# 1. Gere um par dedicado a deploy (sem passphrase — CI não tem como digitar)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/hostinger_deploy -N ""

# 2. Cole a PÚBLICA no hPanel → Avançado → Acesso SSH → Gerenciar chaves SSH
cat ~/.ssh/hostinger_deploy.pub

# 3. Cole a PRIVADA inteira no secret SSH_PRIVATE_KEY
#    (incluindo as linhas BEGIN e END)
cat ~/.ssh/hostinger_deploy

# 4. Teste antes de confiar no CI
ssh -p 65002 -i ~/.ssh/hostinger_deploy u123456789@SEU_HOST "ls -la ~/domains"
```

## `--delete` NÃO apaga tudo

Confusão comum: `rsync --delete` é o oposto de `dangerous-clean-slate`.

| | `dangerous-clean-slate` (antigo) | `rsync --delete-after` (atual) |
|---|---|---|
| Arquivo idêntico | apaga e reenvia | **não toca** |
| Arquivo alterado | apaga e reenvia | envia só ele |
| Arquivo novo | envia | envia |
| Arquivo que sumiu do build | (tudo foi apagado antes) | remove |

Teste real com este site: build onde só o `pt/index.html` mudou e um chunk `_next/static/` ganhou hash novo.

```
deleting _next/static/CHUNK_ANTIGO/main.js     <- lixo do build anterior
_next/static/CHUNK_NOVO/main.js                <- chunk novo
pt/index.html                                  <- unico arquivo alterado

sent 376 bytes  speedup is 420.25
```

`index.html`, `en/index.html` e o `profile.jpg` de 200 KB não foram transferidos — hash idêntico.

**Por que `--delete` é necessário e não opcional:** o Next gera `_next/static/<hash>/` novo a cada build. Sem `--delete`, esses diretórios se acumulam para sempre no `public_html` até estourar a cota do plano.

## O risco real: arquivos que só existem no servidor

`--delete` remove do destino o que não existe em `out/`. Isso inclui coisas que você subiu à mão. No teste acima, sem exclusões, o rsync removeria:

```
deleting .well-known/challenge      <- renovacao de certificado
deleting google1234.html            <- verificacao do Search Console
```

Por isso o workflow já exclui `.well-known/`, `cgi-bin/`, `google*.html` e `*.txt.verification`. **Se você tiver outros arquivos manuais no `public_html`, adicione um `--exclude` para cada um antes do primeiro deploy.**

## Por que `--delete-after` e não `--delete`

O padrão do rsync é `--delete-before`: apaga os órfãos **antes** de transferir. Se a conexão cair no meio, o servidor fica com arquivos removidos e sem os substitutos — site quebrado no ar até o próximo deploy.

`--delete-after` transfere tudo primeiro e só então remove órfãos. Falha no meio deixa o site anterior intacto.

## Rode o dry-run antes do primeiro deploy

```bash
npm run build
rsync -rlvz --checksum --delete-after --dry-run \
  --exclude '.well-known/' --exclude 'cgi-bin/' --exclude 'google*.html' \
  -e "ssh -p 65002" out/ u123456789@SEU_HOST:/caminho/public_html/
```

Leia cada linha `deleting `. Se aparecer algo que você quer manter, adicione ao `--exclude` do workflow.

## Detalhes que evitam dor de cabeça

- **`--checksum`**: o `next build` regenera o mtime de todos os arquivos a cada execução. Sem isso, o rsync acharia que tudo mudou e reenviaria o site inteiro — de volta ao problema original.
- **`--no-perms --no-times --omit-dir-times`**: hospedagem compartilhada costuma recusar `chmod`/`utime` e o rsync aborta com erro. Esses flags evitam isso.
- **`ssh-keyscan`** em vez de `StrictHostKeyChecking=no`: aceitar qualquer host key abre MITM no seu pipeline de deploy.
- **`paths-ignore`**: alteração em `.md` não dispara deploy.
- **Sanity check**: falha o job se `out/index.html`, `out/pt/` ou `out/en/` não existirem, em vez de publicar um site quebrado.

## Se a Hostinger já bloqueou seu IP

O bloqueio é por IP de origem, e os runners do GitHub trocam de IP. Depois de aplicar este workflow o padrão de tráfego muda completamente (1 conexão, poucos KB). Se ainda houver bloqueio ativo na conta, abra chamado no suporte pedindo remoção — mencione que a automação foi corrigida de FTP em rajada para rsync sobre SSH.
