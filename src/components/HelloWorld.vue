<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input class="input_todo" type="text" v-model="todo"/>
      <input type="submit" value="提交" @click="submitTodo()"/>
    </form>
    <hr />
    <h2>待解决</h2>
    <ul>
      <li v-for="(item,key) in list" v-bind:key="key">
        <div v-if="!item.checked">
          <input type="checkbox" v-model="item.checked" @change="change()" />
          <span>{{item.title}}</span>
          <button value="删除" class="button_delete" @click="deleteTodo(key)">删除</button>
        </div>
      </li>
    </ul>
    <hr />
    <h2>已完成</h2>
    <ul>
      <li v-for="(item,key) in list" v-bind:key="key">
        <div v-if="item.checked">
          <input type="checkbox" v-model="item.checked" @change="change()" />
          <span>{{item.title}}</span>
          <button value="删除" class="button_delete" @click="deleteTodo(key)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import storage from "../model/storage.js";
  export default {
    name: "HelloWorld",
    data() {
      return {
        todo: "",
        list: [],
        checked: false
      };
    },
    methods: {
      submitTodo() {
        event.preventDefault();
        if (this.todo == "") {
          return false;
        }
        this.list.push({
          title: this.todo,
          checked: false
        });
        this.todo = "";
        storage.set("todoList", this.list);
      },
      deleteTodo(key) {
        this.list.splice(key, 1);
        storage.set("todoList", this.list);
      },
      change() {
        storage.set("todoList", this.list);
      }
    },
    mounted() {
      var list = storage.get("todoList");
      if (list) {
        this.list = list;
      }
    },
    props: {
      msg: String
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  input {
    display: inline-block;
    font-size: 20px;
    /* box-sizing: border-box; */
  }

  input[type="text"] {
    width: 30%;
    height: 25px;
    /* line-height: 25px; */
    text-align: center;
    outline: none;
    border: 1px solid #2ecc71;
    border-radius: 5px 0 0 5px;
  }

  input[type="submit"] {
    background: #3498db;
    color: white;
    outline: none;
    border: 1px solid #3498db;
    border-radius: 0 5px 5px 0;
  }

  input[type="submit"]:hover {
    background: #2980b9;
  }

  input[type="checkbox"] {
    margin: auto 5px;
    width: 18px;
    height: 18px;
    background: white;
  }

  span{
    font-size: 18px;
  }

  .button_delete {
    font-size: 16px;
    background: #e74c3c;
    color: white;
    height: 25px;
    line-height: 25px;
    margin: auto 5px;
    border: 1px solid #e74c3c;
    border-radius: 5px;
  }

  .button_delete:hover {
    background: #c0392b;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    width: 30%;
    margin: 5px auto;
    text-align: left;
  }

  a {
    color: #42b983;
  }
</style>