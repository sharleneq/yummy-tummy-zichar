import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#2c3e50"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  min: 0
                }
              }]
            },
            maintainAspectRatio: false
        }
        }
    },
    methods : {
      fetchItems: function () {
        database.collection('orders').get().then(querySnapShot => {
          let keys = []
          let current_order = {}
          let total_order = []
          querySnapShot.forEach(doc => { 
            const sortOrder = obj => Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {})
            current_order = sortOrder(doc.data())

            if (keys.length == 0) {
              keys = Object.keys(current_order)
            }

            if (total_order.length == 0) {
              total_order = Object.values(current_order)
            } else {
              for (let i = 0; i < total_order.length; i++) {
                total_order[i] += Object.values(current_order)[i]
              }
            }
          })
          this.datacollection.labels = keys
          this.datacollection.datasets[0].data = total_order
          this.renderChart(this.datacollection, this.options)
        })
      }
    },
    created () {
      this.fetchItems()
    }
}