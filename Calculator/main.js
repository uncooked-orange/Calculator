const result = document.getElementById("resultnumb");
const activeresult = document.querySelector(".activeresult");
//for invalid inputs
const invalidinput = (x) => {
    alert(`Invalid ${x}`);
    clearall();
}
let multipleoperations = false;
let prevnum = "";
let currentnum = "";
let currentoperator = "";
let operatorpress = false;
let resultnum = "";
const nums = [];
const operators = [];
for(let i = 0;i<10;i++)
{
    nums[i] =  document.querySelector(`.n${i}`);
    
}
for(let i = 0; i < 6;i++)
{
    operators[i] = document.querySelector(`.op${i+1}`);
}
//for entering numbers into the result field
function numberinput()
{
    if(currentoperator == "-" && prevnum=="")//in case of negative numbers
    {   
    prevnum += this.innerHTML;
    result.innerHTML += `${this.innerHTML}`;
    }
    else if(operatorpress)
    {
        
        currentnum += this.innerHTML;
        result.innerHTML += `${this.innerHTML}`;
    }
    else
    {
        prevnum += this.innerHTML;
        result.innerHTML += `${this.innerHTML}`;
    }
    
}
function test()
{
    nums[0].style.backgroundColor = `hsl(${Math.floor(Math.random()*360)},100%,50%)`;
}
//for entering an operator
function operatorinput()
{
    if(operatorpress)
        multipleops();
    currentoperator = this.innerHTML;
    operatorpress = true;
    if(multipleoperations)
    {
        prevnum = resultnum;
        currentnum = "";
    }
    //in case of negative numbers being used
    if(currentoperator == "-" && prevnum == "")
    {
        prevnum += currentoperator;
        operatorpress = false;
    }
    result.innerHTML += `${this.innerHTML}`;
}
//for doing the opertions
function operation(c)
{
    switch(c)
    {
        case '+':
            resultnum = `${(Number(prevnum)+Number(currentnum))}`;
            break;
        case '-':
            resultnum = `${(Number(prevnum)-Number(currentnum))}`;
            break;
        case 'x':
            resultnum = `${(Number(prevnum)*Number(currentnum))}`;
            break;
        case '/':
            if(currentnum == 0)
            {
                invalidinput("input: can't divide by zero");
                break;
            }
            resultnum = `${(Number(prevnum)/Number(currentnum))}`;
            break;
    }
    //in case of decimal points we only want it up to 4 decimals
    if(Number(resultnum) != Math.trunc(Number(resultnum)))
    {
        resultnum = `${Number(resultnum).toFixed(4)}`;
        //in case of unwanted zeros we remove them
        while(resultnum.slice(-1) == 0)
        {
            resultnum = resultnum.slice(0,-1);
        }
    }
}
//for outputting the result
function resultcal()
{
    operation(currentoperator);
    result.innerHTML = `${resultnum}`;
    prevnum = resultnum;
    operatorpress = false;
    currentnum = "";
    currentoperator = "";
    activeresult.innerHTML = "";
}
//incase of multiple operations
function multipleops()
{
    result.innerHTML = "Answer"
    operation(currentoperator);
    activeresult.innerHTML = `${resultnum}`;
    multipleoperations = true;
}
//in case of dot operator
function dotclick()
{
    if(operatorpress && !currentnum.includes("."))
    {
        currentnum+=".";
        result.innerHTML += ".";
    }
    else if(!operatorpress && !prevnum.includes("."))
    {
        prevnum+=".";
        result.innerHTML += ".";
    }
    else
    {
        invalidinput("input: can't use multiple dots");
    }
}
//for clearing the results
function clearall()
{
    prevnum = "";
    currentnum = "";
    currentoperator = "";
    operatorpress = false;
    resultnum = "";
    result.innerHTML = "";
    activeresult.innerHTML = "";
    multipleoperations = false;
}
//for deleting numbers
function deletenum()
{
    result.innerHTML = result.innerHTML.slice(0,-1);
    if(currentnum)
    {
        currentnum = currentnum.slice(0,-1);
    }
    else if(currentoperator)
    {
        multipleoperations = false;
        operatorpress = false;
        currentoperator = "";
    }
    else if(result.innerHTML = "Answer")//if we already calculated an answer
    {
        clearall();
    }
    else if(prevnum)
    {
        prevnum = prevnum.slice(0,-1);
    }
}
//adding an event listener to number each button
for(let i = 0; i < 10; i++)
{
    nums[i].addEventListener("click",numberinput)
}
//adding an event listener to operator each button
operators[0].addEventListener("click",dotclick);
operators[1].addEventListener("click",resultcal);
for(let i = 2; i < 6; i++)
{
    operators[i].addEventListener("click",operatorinput);
}