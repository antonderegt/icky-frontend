<template>
  <table v-if="showCategory">
    <tr>
      <th v-if="!editTitle" @click="editTitle = true">{{ category }}</th>
      <th v-else>
        <input v-model="category" @keyup.enter="changeTitle" type="text" />
        <button @click="changeTitle" class="add">V</button>
      </th>
      <button @click="deleteCategory" class="delete">X</button>
    </tr>
    <tr v-for="(item, index) in items" :key="index">
      <td v-if="editItem !== index" @click="changeToInputField(index, item)">
        {{ item }}<button @click="deleteItem(index)" class="delete">X</button>
      </td>
      <td v-else>
        <input v-model="changedItem" @keyup.enter="changeItem" type="text" />
        <button @click="changeItem" class="add">V</button>
      </td>
    </tr>
    <tr>
      <td>
        <input
          v-model="newItem"
          @keyup.enter="addItem()"
          type="text"
          placeholder="new item..."
        />
        <button @click="addItem" class="add">V</button>
      </td>
    </tr>
  </table>
</template>

<script>
import api from "@/gateways/api.js";

export default {
  props: {
    category: String,
    problemPk: Number,
    catPk: Number
  },
  data: function() {
    return {
      items: [],
      deleting: false,
      showCategory: true,
      newItem: "",
      editTitle: false,
      editItem: -1,
      changedItem: ""
    };
  },
  methods: {
    getItems: function() {
      api.get(`/${this.problemPk}/${this.catPk}`).then(response => {
        this.items = response.data.map((item) => {return item.item});
      });
    },
    changeTitle: function() {
      this.editTitle = false;
    },
    changeToInputField(index, item) {
      if (!this.deleting) {
        this.editItem = index;
        this.changedItem = item;
      } else this.deleting = false;
    },
    changeItem: function() {
      this.items[this.editItem] = this.changedItem;
      this.editItem = -1;
      this.changedItem = "";
    },
    addItem: function() {
      if (this.newItem == "") alert("You have to enter something first!");
      else {
        this.items.push(this.newItem);
        this.newItem = "";
      }
    },
    deleteItem: function(index) {
      this.deleting = true;
      this.items.splice(index, 1);
    },
    deleteCategory: function() {
      this.category = "";
      this.items = [];
      this.showCategory = false;
      api.delete(`/${this.problemPk}/${this.catPk}`)
    }
  },
  mounted: function() {
    this.getItems();
  }
};
</script>

<style scoped>
input {
  /* width: calc(100% - 40px); */
  border: 0;
  padding: 6px;
  font-size: 1.1em;
  background-color: #6dbfbf;
  color: rgb(38, 34, 34);
}

.delete {
  background-color: tomato;
  border: 0;
  border-radius: 15%;
  color: whitesmoke;
  font-weight: bold;
  margin: 5px;
}

.add {
  background-color: yellowgreen;
  border: 0;
  border-radius: 15%;
  color: whitesmoke;
  font-weight: bold;
  margin: 5px;
}
</style>
