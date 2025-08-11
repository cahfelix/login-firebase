# Configuração do Firebase - Guia Passo a Passo

## 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar um projeto"**
3. Digite o nome do projeto (ex: "meu-sistema-login")
4. Aceite os termos e clique em **"Continuar"**
5. Desabilite o Google Analytics (opcional) e clique em **"Criar projeto"**

## 2. Configurar Authentication

1. No painel lateral, clique em **"Authentication"**
2. Clique em **"Começar"**
3. Vá para a aba **"Sign-in method"**
4. Habilite os seguintes provedores:

### Email/Password
- Clique em **"Email/Password"**
- Ative a primeira opção (Email/Password)
- Clique em **"Salvar"**

### Google (Opcional)
- Clique em **"Google"**
- Ative o provedor
- Adicione um email de suporte do projeto
- Clique em **"Salvar"**

## 3. Obter Configurações do Projeto

1. Clique no ícone de **engrenagem** ⚙️ no painel lateral
2. Selecione **"Configurações do projeto"**
3. Role para baixo até **"Seus apps"**
4. Clique no ícone **Web** (`</>`)
5. Digite um nome para o app (ex: "Sistema Login Web")
6. **NÃO** marque "Firebase Hosting"
7. Clique em **"Registrar app"**

## 4. Copiar Configurações

Você verá um código similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "meu-projeto.firebaseapp.com",
  projectId: "meu-projeto",
  storageBucket: "meu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 5. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas configurações:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyC...
   VITE_FIREBASE_AUTH_DOMAIN=meu-projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=meu-projeto
   VITE_FIREBASE_STORAGE_BUCKET=meu-projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## 6. Configurar Domínios Autorizados (Para Google Login)

Se você habilitou o login com Google:

1. Vá em **Authentication** > **Settings** > **Authorized domains**
2. Adicione `localhost` (já deve estar lá)
3. Quando fizer deploy, adicione seu domínio de produção

## 7. Testar a Aplicação

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse [http://localhost:3000](http://localhost:3000)

3. Teste o cadastro e login

## 8. Verificar Usuários

No Firebase Console:
1. Vá em **Authentication** > **Users**
2. Você verá os usuários cadastrados

## 🔒 Regras de Segurança (Opcional)

Se você planeja usar Firestore no futuro, configure as regras:

1. Vá em **Firestore Database** > **Rules**
2. Use esta regra básica:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Deploy (Opcional)

Para fazer deploy no Firebase Hosting:

1. Instale o Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Faça login:
   ```bash
   firebase login
   ```

3. Inicialize o projeto:
   ```bash
   firebase init hosting
   ```

4. Faça o build:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   firebase deploy
   ```

## ❗ Problemas Comuns

### Erro: "Firebase config not found"
- Verifique se o arquivo `.env` existe e está preenchido
- Reinicie o servidor de desenvolvimento

### Erro: "Auth domain not authorized"
- Adicione seu domínio em **Authentication** > **Settings** > **Authorized domains**

### Login com Google não funciona
- Verifique se o provedor Google está habilitado
- Confirme se o domínio está autorizado

## 📞 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Consulte a [documentação do Firebase](https://firebase.google.com/docs)
3. Verifique se todas as configurações estão corretas
