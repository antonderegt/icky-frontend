<template>
  <table v-if="showCategory" class="center">
    <tr>
      <th v-if="!editTitle" @click="editTitle = true">
        <p>
         {{ category }} 
        </p></th>
      <th v-else>
        <input v-model="category" @keyup.enter="changeTitle" type="text" autofocus />
        <button @click="changeTitle" class="add">V</button>
      </th>
      <button @click="deleteCategory" class="delete">X</button>
    </tr>
    <tr v-for="(item, index) in items" id="item" :key="item.pk">
      <td
        v-if="editItem !== index"
        @click="changeToInputField(index, item.item)"
      >
        <p>{{ item.item
        }}</p>
      </td>
      <td v-else>
        <input
          v-model="changedItem"
          @keyup.enter="changeItem(item.pk)"
          type="text"
        />
        <button @click="changeItem(item.pk)" class="add">V</button>
      </td>
        <button @click="deleteItem(index, item.pk)" class="delete">X</button>
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
    problemPk: Number,
    catName: String,
    catPk: Number
  },
  data: function() {
    return {
      category: "",
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
    getItems: async function() {
      const problem = { problemPk: this.problemPk, catPk: this.catPk} 
      this.$store
        .dispatch("getItems", problem)
        .then(res => {
          this.items = res;
        })
        .catch(error => {
          alert(error);
        })
    },
    changeTitle: function() {
      try {
        api.put(`/${this.problemPk}/${this.catPk}`, {
          category: this.category
        });
      } catch (error) {
        alert(error);
      }
      this.editTitle = false;
    },
    changeToInputField(index, item) {
      if (!this.deleting) {
        this.editItem = index;
        this.changedItem = item;
      } else this.deleting = false;
    },
    changeItem: function(itemPk) {
      try {
        api.put(`/${this.problemPk}/${this.catPk}/${itemPk}`, {
          item: this.changedItem
        });
      } catch (error) {
        alert(error);
      }
      this.items[this.editItem].item = this.changedItem;
      this.editItem = -1;
      this.changedItem = "";
    },
    addItem: async function() {
      if (this.newItem == "") alert("You have to enter something first!");
      else {
        try {
          const item = await api.put(`/${this.problemPk}/${this.catPk}/new`, {
            item: this.newItem
          });
          this.items.push(item);
        } catch (error) {
          alert(error);
        }
        this.newItem = "";
      }
    },
    deleteItem: function(index, itemPk) {
      this.deleting = true;
      this.items.splice(index, 1);
      try {
        api.delete(`/${this.problemPk}/${this.catPk}/${itemPk}`);
      } catch (error) {
        alert(error);
      }
    },
    deleteCategory: function() {
      this.category = "";
      this.items = [];
      this.showCategory = false;
      try {
        api.delete(`/${this.problemPk}/${this.catPk}`);
      } catch (error) {
        alert(error);
      }
    }
  },
  mounted: function() {
    this.category = this.catName;
    this.getItems();
  }
};
</script>

<style scoped>

table.center {
  margin-left:auto; 
  margin-right:auto;
}

p {
  margin: 2px;
}

tr,td {
  text-align:left;
}
td:first-child {
  padding-left:20px;
  padding-right:0;
}

input {
  box-sizing: border-box;
  border: 0;
  padding-left: 6px;
  outline: none;
  font-size: 1.1em;
  background-color: #6dbfbf;
  color: rgb(38, 34, 34);
}

.delete {
  background-color:whitesmoke;
  border: 0;
  border-radius: 15%;
  color: tomato;
  font-weight: bold;
  margin: 5px;
}
.delete:hover {
  background-color: tomato;
  color: whitesmoke;
}

.add {
  background-color: whitesmoke;
  border: 0;
  border-radius: 15%;
  color:yellowgreen;
  font-weight: bold;
  margin: 5px;
}
.add:hover {
  background-color: yellowgreen;
  color: whitesmoke;
}
</style>
