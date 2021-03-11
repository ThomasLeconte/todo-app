<template>
  <div class="add-list">
    <div class="form">
      <div class="form-header">
        <span class="header-icon"><i class="fas fa-clipboard-list"></i></span>
        <h2>Ajouter une liste de tâche ...</h2>
      </div>
      <div class="form-content">
        <input
          type="text"
          v-model="nameList"
          placeholder="Nom de la liste ..."
        />
        <button @click="submit" class="form-submit">{{ getMessage }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddList",
  data() {
    return {
      nameList: null,
      message: "Envoyer",
      sended: false,
    };
  },
  mounted() {
    this.$store.commit("todolist/resetErrors");
  },
  methods: {
    async submit() {
      if (this.sended) {
        this.$router.push("/home");
      } else {
        let data = {
          nameList: this.nameList,
        };
        this.$store.commit("todolist/resetErrors");
        this.message = "Veuillez patienter ...";
        let result = await this.$store.dispatch("todolist/newList", data);
        if (result) {
          this.message = "Liste créée ! Cliquez pour revenir à l'accueil";
          this.sended = true;
        } else {
          this.message = this.getErrors[0];
        }
      }
    },
  },
  computed: {
    ...mapGetters("todolist", ["getErrors"]),
    getMessage() {
      return this.message;
    },
  },
};
</script>

<style>
.add-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  border-radius: 10px;
  width: 80%;
  height: 80%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.form-header {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-content {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-icon {
  font-size: 5em;
  color: rgb(241, 205, 42);
  background-color: #333;
  width: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 100px;
  transition: 0.2s ease-in-out;
}

.header-icon:hover {
  background-color: rgb(241, 205, 42);
  color: #333;
  transition: 0.2s ease-in-out;
}

.form-content input {
  background-color: none;
  border: 2px solid #333;
  border-radius: 4px;
  padding: 20px;
  font-size: 1.5em;
  width: 40%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.2s ease-in-out;
}

.form-content input:hover {
  padding: 23px;
  transition: 0.2s ease-in-out;
}

.form-content button {
  margin-top: 20px;
  background-color: none;
  border: none;
  border-radius: 5px;
  padding: 20px;
  width: 43.5%;
  text-transform: uppercase;
  font-weight: bold;
  transition: 0.2s ease-in-out;
  letter-spacing: 2px;
}

.form-content button:hover {
  padding: 23px;
  cursor: pointer;
  background-color: #17a2ff;
  color: white;
  transition: 0.2s ease-in-out;
}
</style>