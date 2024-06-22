async function search(a) {
     let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d07643c42464af1b20194451242106&q=${a}&days=3`);
     if (res.ok &&  res.status != 400) {
          let data = await res.json(); 
          CurrentForcast(data.location, data.current), nextdayForcast(data.forecast.forecastday)
     }
}
document.getElementById("search").addEventListener("keyup", a => {
     search(a.target.value)
});
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function CurrentForcast(a, t) {
     if (t != null) {
          var date = new Date(t.last_updated.replace(" ", "T"));
          let n = `
          <div class="card-header d-flex justify-content-between">
                <h5>${days[date.getDay()]}</h5>
                <p class="align-self-end">${date.getDate() + monthNames[date.getMonth()]}</p>
              </div>
              <div class="card-body">
                <div class="px-4">
                  <h5 class="card-title">${a.name}</h5>
                  <h2 class="py-4">${t.temp_c}<sup>o</sup>C</h2>
                  <img src="https:${t.condition.icon}" alt="" width=90>
                  <p>${t.condition.text}</p>
                </div>  
                <ul class="d-flex forcast-footer mt-4 pb-3">
                  <li class="me-4 d-flex">
                    <i class="fa-solid fa-umbrella me-2"></i>
                    <p class="align-mid">20%</p>
                  </li>
                  <li class="me-4 d-flex">
                    <i class="fa-solid fa-wind me-2"></i>
                    <p class="align-mid">18KM/H</p>
                  </li>
                  <li class="me-4 d-flex">
                    <i class="fa-regular fa-compass me-2"></i>
                    <p class="align-mid">East</p>
                  </li>
                </ul>
              </div>`;
          document.getElementById("current-forcast").innerHTML = n
     }
}
function nextdayForcast(a) {
     let box = "";
     for (let i = 1; i < a.length; i++)
          box += `<div class="col-md-4">
              <div class="card bg-dark-pp text-light text-center" id="">
                <h5 class="card-header py-3">
                  ${days[new Date(a[i].date.replace(" ", "T")).getDay()]}
                </h5>
                <div class="card-body p-5">
                  <div class="px-4">
                    <img src="https:${a[i].day.condition.icon}" alt="" width="48" />
                    <h2 class="py-4">${a[i].day.maxtemp_c}<sup>o</sup>C</h2>
                    <h5 class="py-3 mb-2">${a[i].day.mintemp_c}<sup>o</sup>C</h5>
                    <p class="pb-3">${a[i].day.condition.text}</p>
                  </div>
                </div>
              </div>
            </div>`;
      document.getElementById("next-forcast").innerHTML += box
}
search("cairo");

