<template>
  <section class="serviceRequests">
    <div class="container is-fluid srBox">
      <h2>Service Request #0131231231 </h2>
      <div class="columns">
        <div class="column  is-one-fifth">
          <h3>Status</h3>
          <div class="status">{{ infoContent.status }}</div>
        </div>
        <div class="column is-one-fifth">
          <h3> Date Created </h3>
          <h4> {{ infoContent.created_date }}</h4>
          <h3> Date Closed </h3>
          <h4> {{ infoContent.closed_date }}</h4>
        </div>
        <div class="column">
          <h3> Agency </h3>
          <h4> {{ infoContent.agency_name }}</h4>
          <h3> Incident Address </h3>
          <h4> {{ infoContent.incident_address }} </h4>
        </div>
      </div>
      <div class="columns">
          <div class="column is-one-fifth">
            <h3>Complaint Type</h3>
            <h4> {{ infoContent.complaint_type }}</h4>

          </div>
          <div class="column is-two-thirds">
            <h3>Complaint Description</h3>
            <h4> {{ infoContent.description }} </h4>

          </div>
      </div>
  </div>
  </section>
</template>

<style scoped>
section.serviceRequests {
    position: absolute;
    top: 75px;
    z-index: 9;
    background-color: white;
    color: black;
    padding: 15px;
    border: 1px solid lightgray;
    width: 50%;
    box-shadow: 2px 2px 20px lightgray;
    /* margin-right: 50%; */
    /* margin-left: 50%; */
    /* align-self:  center; */
    left: 15px;
    /* margin-left: -50%; */
}

h2 {
    text-align: left;
    font-size: 30px;
}

h3 {
    text-align: left;
    text-transform: uppercase;
    font-size: 10px;
    color: gray;
}

h4 {
    text-align: left;
    font-weight: bold;
    font-size: 20px;
}

.status {
    border: 1px solid #770000;
    background-color: pink;
    height: 50px;
    line-height: 50px;
}

.container.srBox {
    /* width: 800px; */
    margin-left: 15px;
    margin-right: 15px;
}

.srBox {
}
</style>
<script>
export default {
       props: ['infoContent'],
       data() {
           return {
               first_column: '1st',
               second_column: '2nd',
               third_column: '3rd',
               fourth_column: '4th'
           }
       }
   }

</script>
