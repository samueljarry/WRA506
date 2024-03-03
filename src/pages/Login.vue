<script lang="ts">
import { ApiRoutesId } from '../constants/ApiRoutesId';
import { HTTPResponseId } from '../constants/HTTPResponsesId';
import { LocalStorageId } from '../constants/LocalStorageId';
import router from '../router';
import { LoginsAction } from '../utils/actions/LoginsAction';

type AuthResponse = {
  message: string;
  token: string;
  code: number;
}

export default {
  data() {
    return {
      status: '',
      formData: {
        password: '',
        email: ''
      }
    };
  },
  methods: {
    async submitCredentials() {
      const request: AuthResponse = await fetch(
        ApiRoutesId.AUTHENTICATION, 
        {
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
        }
      ).then((res: Response) => res.json())
      .catch((err: Error) => console.error(err));

      const { token, code, message } = request

      if(code === HTTPResponseId.UNAUTHORIZED) {
        this.status = message;
      } else {
        router.push('/');
        localStorage.setItem(LocalStorageId.AUTH_TOKEN, token);
        localStorage.setItem(LocalStorageId.USERMAIL, this.formData.email);
        this.status = '';
        LoginsAction.Dispatch()
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitCredentials">
    <div>
      <label for="email">Email :</label>
      <input autocomplete="off" type="email" id="email" v-model="formData.email">
    </div>

    <div>
      <label for="password">Password :</label>
      <input autocomplete="off" type="password" id="password" v-model="formData.password">
    </div>

    <button type="submit">Envoyer</button>
  </form>

  <p class="status">{{ status }}</p>
</template>

<style lang="scss"> 
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    div {
      display: inherit;
      flex-direction: inherit;
      width: fit-content;
      
      input {
        min-width: 200px;
        height: 20px;
      }
    }

    button[type=submit] {
      width: fit-content;
    }
  }
  .status {
    color: red;
  }
</style>