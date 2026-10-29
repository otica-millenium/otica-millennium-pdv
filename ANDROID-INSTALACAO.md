# Ótica MilleniuM — aplicativo Android

Este repositório contém o código do novo PDV da ótica e um fluxo de compilação Android usando Capacitor.

## Gerar APK

Abra a aba **Actions** no GitHub, escolha **Compilar APK Android** e clique em **Run workflow**. Quando o fluxo terminar com sucesso, abra a execução e baixe o artefato `otica-millennium-pdv-android-debug`. Extraia o ZIP para obter `app-debug.apk`.

O APK é de **testes**, não assinado para distribuição pela Play Store. No Android, autorize a instalação dessa fonte somente se confiar no arquivo.

## Atenção

O app ainda usa armazenamento local para os produtos, imagens e pedidos. O APK **não sincroniza dados entre aparelhos** e **não confirma pagamentos**. É necessário configurar banco de dados, autenticação, armazenamento de imagens e pagamentos antes de usá-lo como loja online real.
