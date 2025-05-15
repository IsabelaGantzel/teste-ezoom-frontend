# Teste Técnico – Frontend (Ezoom)

## Tecnologias

* Ionic CLI 6+
* Ionic Framework 8
* Angular 19
* Capacitor 5
* TypeScript, HTML5, SCSS

## Instalação e Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/SeuUsuario/teste-ezoom-frontend.git
   cd teste-ezoom-frontend
   ```
2. **Instale as dependências**

   ```bash
   npm install
   ```
3. **Configure o endpoint da API**

   * Abra `src/environments/environment.ts` e ajuste:

     ```ts
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:8080'
     };
     ```

## Estrutura de Telas

### 1. LoginPage

* Formulário de usuário e senha.
* Chama `AuthService.login()`, autentica via API e armazena token/localStorage.
* Após login, redireciona para `/notifications`.

### 2. NotificationsPage

* Rota protegida com `AuthGuard`.
* Carrega notificações via `GET ${environment.apiUrl}/notifications?user_id={id}`.
* Exibe lista de cards com título, mensagem e data.
* Notificações não lidas aparecem com destaque.
* Ao tocar, chama `POST ${environment.apiUrl}/notifications/{id}/read` e atualiza o estado.

### 3. AdminNotificationsPage

* Formulário para envio de notificações:

  * Dropdown de usuários (mock ou via API).
  * Campos: título e mensagem.
* Envio via `POST ${environment.apiUrl}/notifications`.
* Feedback de sucesso/erro.

## Demonstração em GIF

   ![Demo do Admin](src/assets/demo/admin.gif)

## Setup do Capacitor

1. **Instale Capacitor** (se ainda não estiver):

   ```bash
   npm install @capacitor/core @capacitor/cli --save
   ```
2. **Inicialize o Capacitor** (caso não tenha):

   ```bash
   npx cap init teste-ezoom-frontend com.ezoom.frontend
   ```
3. **Adicione a plataforma Android**:

   ```bash
   npx cap add android
   ```

## Gerando o APK com Capacitor

1. **Build Web**:

   ```bash
   ionic build
   ```

   * Gera a pasta `www/`.
2. **Sincronizar com Capacitor**:

   ```bash
   npx cap copy android
   npx cap sync android
   ```
3. **Abrir no Android Studio**:

   ```bash
   npx cap open android
   ```
4. **Gerar APK/Bundle** no Android Studio:

   * **Build → Build Bundle(s) / APK(s) → Build APK(s)** (debug)
   * **Build → Generate Signed Bundle / APK** (release)
   * Configure seu keystore para assinar o release.

O APK final estará em:

```
android/app/build/outputs/apk/
```

## Instruções de Uso no Android

1. Copie o `.apk` para o dispositivo ou emulador.
2. No Android, habilite “Fontes desconhecidas”.
3. Instale o APK e abra o app.

## Considerações e Decisões Técnicas

* **Capacitor**: integração nativa moderna e suporte a plugins.
* **AuthGuard**: garante fluxo de login antes do acesso às áreas protegidas.
* **Services**: separação de lógica de comunicação com a API (AuthService, NotificationsService).
* **Responsividade**: componentes Ionic adaptam-se a diferentes resoluções.

---

**Desenvolvido por Isabela de Almeida Gantzel**
