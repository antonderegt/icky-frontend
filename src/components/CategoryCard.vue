<template>
  <table v-if="showCategory" class="center">
    <tr>
      <th v-if="!editTitle" @click="editTitle = true">
        <p>
          {{ category.category }}
        </p>
      </th>
      <th v-else>
        <input
          v-model="category.category"
          @keyup.enter="changeTitle"
          type="text"
          autofocus
        />
        <button @click="changeTitleHelper" class="add">V</button>
      </th>
      <button @click="deleteCategoryHelper" class="delete">X</button>
    </tr>
    <tr v-for="(item, index) in category.items" id="item" :key="item.pk">
      <td
        v-if="editItem !== index"
        @click="changeToInputField(index, item.item)"
      >
        <p>{{ item.item }}</p>
      </td>
      <td v-else>
        <input
          v-model="changedItem"
          @keyup.enter="changeItemHelper(item.pk)"
          type="text"
        />
        <button @click="changeItemHelper(item.pk)" class="add">V</button>
      </td>
      <button @click="deleteItemHelper(index, item.pk)" class="delete">
        X
      </button>
    </tr>
    <tr>
      <td>
        <input
          v-model="newItemName"
          @keyup.enter="addItemHelper"
          type="text"
          placeholder="new item..."
        />
        <button @click="addItemHelper" class="add">V</button>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    problemPkProp: Number,
    categoryProp: Object
  },
  data: function() {
    return {
      category: {},
      deleting: false,
      showCategory: true,
      newItemName: "",
      editTitle: false,
      editItem: -1,
      changedItem: ""
    };
  },
  methods: {
    ...mapActions([
      "changeCategoryName",
      "deleteCategory",
      "changeItemName",
      "addItem",
      "deleteItem"
    ]),
    changeTitleHelper: function() {
      const updatedCategory = {
        problemPk: this.problemPkProp,
        catPk: this.category.pk,
        category: this.category.category
      };
      this.changeCategoryName(updatedCategory).then(() => {
        this.editTitle = false;
      });
    },
    deleteCategoryHelper: function() {
      const toBeDeletedCategory = {
        problemPk: this.problemPkProp,
        catPk: this.category.pk
      };
      this.deleteCategory(toBeDeletedCategory).then(() => {
        this.category = {};
        this.showCategory = false;
      });
    },
    changeItemHelper: function(itemPk) {
      const updatedItem = {
        problemPk: this.problemPkProp,
        catPk: this.category.pk,
        itemPk,
        item: this.changedItem
      };

      this.changeItemName(updatedItem).then(() => {
        this.category.items[this.editItem].item = this.changedItem;
        this.editItem = -1;
        this.changedItem = "";
      });
    },
    addItemHelper: async function() {
      if (this.newItemName == "") alert("You have to enter something first!");
      else {
        const newItem = {
          problemPk: this.problemPkProp,
          catPk: this.category.pk,
          item: this.newItemName
        };
        this.addItem(newItem).then(res => {
          if (this.category.item) {
            this.category.items.push(res);
          } else {
            this.category.items = [];
            this.category.items.push(res);
          }
          this.newItemName = "";
        });
      }
    },
    deleteItemHelper: function(index, itemPk) {
      const item = {
        problemPk: this.problemPkProp,
        catPk: this.category.pk,
        itemPk
      };
      this.deleteItem(item).then(() => {
        this.deleting = true;
        this.category.items.splice(index, 1);
      });
    },
    changeToInputField(index, item) {
      if (!this.deleting) {
        this.editItem = index;
        this.changedItem = item;
      } else this.deleting = false;
    }
  },
  created: function() {
    this.category = this.categoryProp;
    if (this.category.items === undefined) this.category.items = [];
  }
};
</script>

<style scoped>
table.center {
  margin-left: auto;
  margin-right: auto;
}

p {
  margin: 2px;
}

tr,
td {
  text-align: left;
}
td:first-child {
  padding-left: 20px;
  padding-right: 0;
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
  background-color: whitesmoke;
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
  color: yellowgreen;
  font-weight: bold;
  margin: 5px;
}
.add:hover {
  background-color: yellowgreen;
  color: whitesmoke;
}
</style>
