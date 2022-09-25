<template>
  <div class="home">
    <div class="columns">
      <div class="column is-half home-box">
        <small>Você gastou</small>
        <div class="money" v-money-format="values.totalSpent">R$</div>
        <small>em 89 compras</small>
      </div>
      <div class="column is-half home-box">
        <small>A média de gastos é de</small>
        <div class="money" v-money-format="values.avarage">R$</div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half home-box bottom">
        <small>O maior gasto foi de</small>
        <div class="money" v-money-format="values.biggest.value">R$</div>
        <small>
          No dia <span v-date-format="values.biggest.createdAt"></span
        ></small>
      </div>
      <div class="column is-half home-box bottom">
        <small>O menor gasto foi de</small>
        <div class="money" v-money-format="values.lowest.value">R$</div>
        <small>
          No dia <span v-date-format="values.lowest.createdAt"></span>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      expenses: [],
      values: {
        totalSpent: 0,
        avarage: 0,
        biggest: {},
        lowest: {},
      },
    };
  },
  computed: {
    GetCurrentUser() {
      return this.$store.getters["user/GetCurrentUser"];
    },
    GetExpenses() {
      return this.$store.getters["database/GetExpenses"];
    },
  },
  watch: {
    GetExpenses: {
      handler(newExpenses) {
        this.expenses = Object.keys(newExpenses).map((i) => newExpenses[i]);
        this.setTotalSpent();
        this.setAvarage();
        this.setBiggest();
        this.setLowest();
      },
      deep: true,
    },
  },
  methods: {
    setTotalSpent() {
      this.values.totalSpent = this.expenses
        .map((e) => Number(e.value))
        .reduce((acc, cur) => acc + cur, 0);
    },
    setAvarage() {
      this.values.avarage = this.values.totalSpent / this.expenses.length;
    },
    setBiggest() {
      this.values.biggest = this.expenses.sort(
        (a, b) => Number(b.value) - Number(a.value)
      )[0];
    },
    setLowest() {
      this.values.lowest = this.expenses.sort(
        (a, b) => Number(a.value) - Number(b.value)
      )[0];
    },
  },
  created() {
    this.$store.dispatch("database/bindExpenses", this.GetCurrentUser);
  },
  beforeUnmount() {
    this.$store.dispatch("database/unbindExpenses");
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  padding-top: 27px;
  padding-right: 27px;
}
.home-box {
  font-size: 30pt;
  height: calc(50vh - 15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  &:nth-child(2) {
    border-left: none;
  }
  small {
    font-size: 1.3rem;
  }
  .money {
    color: orange;
  }
}
.bottom {
  border-top: none;
}
</style>
