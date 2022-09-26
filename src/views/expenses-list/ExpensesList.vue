<template>
  <div>
    <div class="months-navigation">
      <div :key="i" v-for="(month, i) in groupedMonths" class="month-link">
        <div class="month-label">{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total">R$</div>
      </div>
    </div>
    <div class="container">
      <expense-list-item></expense-list-item>
      <expense-list-item></expense-list-item>
      <expense-list-item></expense-list-item>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import groupBy from "lodash.groupby";
import ExpenseListItem from "./ExpenseListItem";
export default {
  name: "ExpensesList",
  components: {
    ExpenseListItem,
  },
  data() {
    return {
      expenses: [],
      groupedMonths: [],
      selectedMonth: {},
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
        this.setGroupedMonths();
      },
      deep: true,
    },
  },
  methods: {
    setGroupedMonths() {
      const addCurrentMonth = () => {
        this.groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format("MM/YYYY"),
        });
      };

      const months = groupBy(this.expenses, (i) => {
        return moment(i.createdAt).format("MM/YYYY");
      });
      const sortedMonths = Object.keys(months).sort((a, b) => {
        if (
          moment(`${a} 01`, "MM/YYYY HH").isBefore(
            moment(`${b} 01`, "MM/YYYY HH")
          )
        ) {
          return -1;
        } else {
          return +1;
        }
      });
      this.groupedMonths = sortedMonths.map((month) => ({
        month,
        data: months[month],
        total: months[month]
          .map((e) => Number(e.value))
          .reduce((acc, cur) => acc + cur, 0),
      }));
      const lastMonth = moment(
        this.groupedMonths[this.groupedMonths.length - 1].month,
        "MM/YYYY"
      );
      if (!lastMonth.isSame(moment(), "month")) {
        addCurrentMonth();
      }
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
.months-navigation {
  color: white;
  display: flex;
  width: calc(100% + 12px);
  background-color: #18232e;
  margin-left: -12px;
  .month-link {
    padding: 15px;
    cursor: pointer;
    transition: 0.4s;
    text-align: center;
    &:hover {
      background-color: rgb(34, 48, 61);
    }
    .value-label {
      color: orange;
      font-size: 8pt;
    }
  }
}

.container {
  font-size: 15pt;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
