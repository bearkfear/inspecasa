<template lang="pug">
  section.section.background-svg
    .container
      .columns
        .column
        .column.is-6
          .content.mt-6
            .has-text-centered.mb-6
              img(
                src="~@/assets/logo.svg"
                width="180"
                alt="logo"
              ).image-brand
            form(@submit.prevent="onSubmit()").py-5.px-5.box
              b-button(
                v-if="emailValid"
                icon-left="arrow-left"
                rounded
                @click="onVoltar()"
              ) Voltar

              div(
                v-if="emailValid"
              ).has-text-centered
                center.mb-4
                  b-image(
                    placeholder="~@/assets/user-placeholder.jpeg"
                    :src="urlImg"
                    rounded
                  ).is-96x96.g-user-image
                p.g-user-name.subtitle.is-5 {{ `${nome} ${sobrenome}` }}
              b-field(
                v-if="!emailValid"
                label="E-mail"
                :type="emailErrors.length ? 'is-danger' : ''"
                :message="emailErrors"
              )
                b-input(
                  v-if="!emailValid"
                  type="email"
                  expanded
                  icon-right="at"
                  size="is-medium"
                  v-model="email"
                  placeholder="Digite seu email"

                )
              b-field(
                :type="passwordErrors.length ? 'is-danger' : ''"
                :message="passwordErrors"
              )
                b-input.mt-6(
                  v-if="emailValid"
                  v-model="password"
                  type="password"
                  password-reveal
                  size="is-medium"
                  expanded
                  placeholder="Senha"
                )
              b-button(
                tag="button"
                :disabled="isSubmitting"
                :loading="isSubmitting"
                expanded
                type="is-primary"
                size="is-medium"
                @click="onSubmit()"
                icon-right="sign-in-alt"
              ).mt-4 {{ emailValid? "Entrar" : "Próximo" }}
        .column
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import verifyTokenIsValid from '@/utils/verifyTokenIsValid';
import EsqueciMinhaSenha from '@/components/EsqueciMinhaSenha/index.vue';
import mutationTypes from '@/store/modules/auth/mutationTypes';
import { Expo, TimelineLite, Back } from 'gsap';
@Component({
  components: {
    EsqueciMinhaSenha
  }
})
export default class SignIn extends Vue {
  ratio: string = '1by1';
  nome: string = '';
  sobrenome: string = '';
  urlImg: string = '';
  email: string | null = null;
  emailValid: boolean = false;
  password: string | null = null;
  isSubmitting = false;
  emailErrors: string[] = [];
  passwordErrors: string[] = [];

  mounted() {
    if (verifyTokenIsValid()) {
      this.$router.push({ path: '/' });
    } else {
      const { lastEmail } = this.$store.state.auth;
      if (this.$store.state.auth.lastEmail) {
        this.email = lastEmail;
        this.verificar();
      }
    }
  }

  onVoltar(): void {
    const timeline = new TimelineLite();

    timeline.to('.g-user-name', {
      duration: 0.5,
      opacity: 0,
      ease: Expo.easeOut
    });

    timeline.to('.g-user-image', {
      duration: 0.5,
      scale: 0,
      rotate: 10,
      ease: Back.easeOut,
      onComplete: () => {
        this.emailValid = false;
      }
    });
  }

  async verificar() {
    this.isSubmitting = true;
    const resp = await this.$store.dispatch('verificarEmail', this.email);
    const data = resp.verificaUsuario;
    this.emailErrors = [];
    if (data) {
      this.$store.commit(mutationTypes.ADD_LAST_EMAIL, this.email);
      this.urlImg = data.urlImg;
      this.nome = data.nome;
      this.sobrenome = data.sobrenome;
      this.emailValid = true;
      this.$nextTick().then(() => {
        const timeline = new TimelineLite();

        timeline.from('.g-user-name', {
          duration: 0.5,
          opacity: 0,
          ease: Expo.easeOut
        });

        timeline.from('.g-user-image', {
          duration: 0.5,
          scale: 0,
          rotate: 10,
          ease: Back.easeOut
        });
      });
    } else {
      this.emailErrors.push('Email não existe');
    }
    this.isSubmitting = false;
  }

  async entrar() {
    if (this.emailValid) {
      // logar usuario
      const resp = await this.$store.dispatch('logarUsuario', {
        email: this.email,
        password: this.password
      });

      if (!resp.success) {
        if (resp.location === 'password') {
          this.passwordErrors = [resp.message];
        }
      } else {
        const timeline = new TimelineLite();

        timeline.to('.image-brand', {
          x: -300,
          ease: Expo.easeIn,
          onComplete: () => {
            this.$router.push('/');
          }
        });
      }
    }
  }

  async onSubmit(): Promise<void> {
    this.isSubmitting = true;

    if (!this.emailValid) {
      // verificar email
      await this.verificar();
      this.isSubmitting = false;
      return;
    }
    await this.entrar();
    // logar usuario
    this.isSubmitting = false;
  }
}
</script>
<style lang="scss" scoped>
.footer {
  background-color: transparent;
}
.background-svg {
  height: 100vh;
  background-color: white;
  background-image: url('~@/assets/wave.svg');
  background-repeat: no-repeat;
  background-position: bottom;
}
.profile-image {
  width: 100px;
  height: 100px;
}
</style>
