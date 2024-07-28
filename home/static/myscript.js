let chart1, chart2, chart3;

const fetchData2 = async (city) => {
    const APIKey = '05f73b7b5b8440f0f61fec0f584d0cd9';
    if (city === '') return;

    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const json2 = await res2.json();
    console.log(json2);
    return json2;
}

const fetchData3 = async (city) => {
    const APIKey = '05f73b7b5b8440f0f61fec0f584d0cd9';
    if (city === '') return;

    const res3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const json3 = await res3.json();
    console.log(json3);
    return json3;
}

const fetchData4 = async (json2, json3) => {
    const site1 = json2?.name;
    const site2 = json3?.name;
    const temp1 = json2?.main?.temp;
    const temp2 = json3?.main?.temp;
    const hud1 = json2?.main?.humidity;
    const hud2 = json3?.main?.humidity;
    const spd1 = json2?.wind?.speed;
    const spd2 = json3?.wind?.speed;
    console.log(site1);
    console.log(hud1);
    console.log(temp1);
    console.log(spd1);

    if (chart1) chart1.destroy();
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [site1, site2],
            datasets: [{
                label: 'Temperature (°C)',
                data: [temp1, temp2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 18 // Change legend font size
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Temperature Comparison',
                    font: {
                        size: 24 // Change title font size
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 16 // Change x-axis font size
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 16 // Change y-axis font size
                        }
                    }
                }
            }
        }
    });

    if (chart2) chart2.destroy();
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    chart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [site1, site2],
            datasets: [{
                label: 'Humidity (%)',
                data: [hud1, hud2],
                backgroundColor: ['rgb(54, 162, 235)','rgb(255, 99, 132)'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Humidity Comparison',
                    font: {
                        size: 24 // Change title font size
                    }
                }
            }
        }
    });
    
    if (chart3) chart3.destroy();
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    chart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: [site1, site2],
            datasets: [{
                label: 'WindSpeed (Km/hr)',
                data: [spd1, spd2],
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 18 // Change legend font size
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'WindSpeed Comparison',
                    font: {
                        size: 24 // Change title font size
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 16 // Change x-axis font size
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 16 // Change y-axis font size
                        }
                    }
                }
            }
        }
    });
}

const submit = document.querySelector(".hello");
submit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city2 = localStorage.getItem("city");
    const search = document.querySelector('.inputs').value;

    if (!city2 || !search) {
        console.error("Both cities must be provided");
        return;
    }

    const json2 = await fetchData2(city2);
    const json3 = await fetchData3(search);
    
    if (!json2 || !json3) {
        console.error("Failed to fetch weather data for one or both cities");
        return;
    }
    
    fetchData4(json2, json3);
    const graphs = document.getElementById("graphs");
    graphs.style.display = "flex";
    
    setTimeout(() => {
        graphs.classList.add("show");
    }, 0);
});
