let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

let newOptions = "";
for(let code in countryList)
{
    newOptions += `<option value="${code}">${code}</option>`;
}

document.querySelector("#to").innerHTML = newOptions.replace('<option value="INR">INR</option>','<option value="INR" selected>INR</option>');
document.querySelector("#from").innerHTML = newOptions.replace('<option value="USD">USD</option>','<option value="USD" selected>USD</option>');

document.querySelector("#from").addEventListener("change",()=>{
    let selectedVal = document.querySelector("#from").value.slice(0,2);

    document.querySelector("#fromImg").setAttribute("src",`https://flagsapi.com/${selectedVal}/flat/32.png`)
});

document.querySelector("#to").addEventListener("change",()=>{
    let selectedVal = document.querySelector("#to").value.slice(0,2);
  
    document.querySelector("#toImg").setAttribute("src",`https://flagsapi.com/${selectedVal}/flat/32.png`)
});

document.querySelector("#convert-btn").addEventListener("click",async ()=>{

    let fromVal = document.querySelector("#from").value.toLowerCase();
    let toVal = document.querySelector("#to").value.toLowerCase();
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromVal}.json`;
    let res = await fetch(url);
    let data = await res.json();
    let amt = document.querySelector("#amt").value;


    if(amt === "" || amt < 1){
        document.querySelector("#amt").value = 1;
        amt = 1;
    }

    let toSelectedVal = document.querySelector("#to").value;
    let fromSelectedVal = document.querySelector("#from").value;
    let rate = data[fromVal][toVal];
 
    document.querySelector("#res").innerText = `${amt}${fromSelectedVal} = ${amt*rate}${toSelectedVal}`;
});