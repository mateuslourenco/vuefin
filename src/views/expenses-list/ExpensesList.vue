<template>
  <div>
    <div class="months-navigation">
      <div
        :key="i"
        v-for="(month, i) in groupedMonths"
        class="month-link"
        :class="{ active: month.month === selectedMonth.month }"
        @click="setSelectedMonth(month)"
      >
        <div class="month-label">{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total">R$</div>
      </div>
    </div>
    <div class="container">
      <expense-list-item
        :key="index"
        :data="item"
        v-for="(item, index) in selectedMonth.data"
      ></expense-list-item>
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
      months: [],
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
    addCurrentMonth() {
      this.groupedMonths.push({
        data: [],
        total: 0,
        month: moment().format("MM/YYYY"),
      });
    },
    getMonths() {
      return groupBy(this.expenses, (i) => {
        return moment(i.createdAt).format("MM/YYYY");
      });
    },
    getSortedMonths() {
      return Object.keys(this.months).sort((a, b) => {
        moment(`${a} 01`, "MM/YYYY HH").isBefore(
          moment(`${b} 01`, "MM/YYYY HH")
        )
          ? -1
          : +1;
      });
    },
    checkIfLastMonthIsCurrentMonth() {
      const lastMonth = moment(
        this.groupedMonths[this.groupedMonths.length - 1].month,
        "MM/YYYY"
      );
      if (!lastMonth.isSame(moment(), "month")) {
        this.addCurrentMonth();
      }
    },
    setGroupedMonths() {
      this.months = this.getMonths();
      const sortedMonths = this.getSortedMonths();
      this.groupedMonths = sortedMonths.map((month) => ({
        month,
        data: this.months[month],
        total: this.months[month]
          .map((e) => Number(e.value))
          .reduce((acc, cur) => acc + cur, 0),
      }));
      this.checkIfLastMonthIsCurrentMonth();
      this.setSelectedMonth();
    },
    setSelectedMonth(month = null) {
      this.selectedMonth = month
        ? month
        : this.groupedMonths[this.groupedMonths.length - 1];
    },
    defineSelectedMonth(month) {
      return moment(month, "MM/YYYY").isSame(moment(), "month");
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
    &.active {
      background-color: #385572;
    }
    &:hover {
      background-color: #22303d;
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
