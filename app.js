//Array Container 
const arrayContainerOne = document.querySelector('.array-one');
//each individual item within the Array Container 
const items = document.querySelectorAll('.item');
const item = arrayContainerOne.children;
let itemsArray = Array.from(item);

const userStatus = document.querySelector('.user-info');
const unshift_nextElement_container = document.querySelector('unshift-next-element-container')
const push_nextContainer = document.querySelector('.push-next-container');
const pop_nextContainer = document.querySelector('.pop-next-container');
const unshift_nextContainer = document.querySelector('.unshift-next-container');
const shift_nextContainer = document.querySelector('.shift-next-container');

//A Preview of what's being added/removed to Array (Next to Button Preview)
const push_previewNextElement = document.querySelector('.push-item');
const pop_previewNextElement = document.querySelector('.pop-item');
const shift_previewNextElement = document.querySelector('.shift-item');
const unshift_previewNextElement = document.querySelector('.unshift-item');

//buttons 
const unshiftBtn = document.querySelector('#unshift');
const shiftBtn = document.querySelector('#shift');
const pushBtn = document.querySelector('#push');
const popBtn = document.querySelector('#pop');
const spliceBtn = document.querySelector('#splice');
const clearBtn = document.querySelector('#clear');


//Event Listeners
unshiftBtn.addEventListener('click', unshift);
shiftBtn.addEventListener('click', shift);
popBtn.addEventListener('click', pop);
pushBtn.addEventListener('click', push);
spliceBtn.addEventListener('click', splice)
clearBtn.addEventListener('click', clear);
arrayContainerOne.addEventListener('click', UserSelectsItemsFromArray);

//global Variables
let setTimeOutProcessing = false;
let clickCountArray = 0;
let isSpliceActive = false;
let firstElementClicked, SecondElementClicked;

loadPageWithRandomArrayAmount();

function previewNextElement_PUSH(){
    if(setTimeOutProcessing === false){
        setTimeOutProcessing = true;
        const push_previewNextElement = document.querySelector('.push-item');
        const shift_previewNextElement = document.querySelector('.shift-item');
        updateTheNextPreviewIndex();
        gsap.fromTo(push_previewNextElement, {y:0}, {y: -300, duration: .5});
        setTimeout(()=>{
            push_previewNextElement.remove();
            const newElement = document.createElement('div');
            newElement.setAttribute('class', `small-item push-item`);
            newElement.innerText = `[${itemsArray.length}]`;
            gsap.fromTo(newElement, {y: 300}, {y: 0, duration: .5});
            push_nextContainer.append(newElement);
            shift_previewNextElement.innerText = `[0]`;
            setTimeOutProcessing = !setTimeOutProcessing;
        }, 500);
    }
}

function previewNextElement_POP(){
    if(setTimeOutProcessing === false){
        itemsArray = Array.from(item);
        setTimeOutProcessing =  true;
        const pop_previewNextElement = document.querySelector('.pop-item');
        const shift_previewNextElement = document.querySelector('.shift-item');
        gsap.fromTo(pop_previewNextElement, {y:0}, {y: 300, duration: .5});
        setTimeout(()=>{
            pop_previewNextElement.remove();
            const newElement = document.createElement('div');
            newElement.setAttribute('class', `small-item pop-item`);
            if(itemsArray.length === 0){
                newElement.innerText = `[ ]`;
                shift_previewNextElement.innerText = `[ ]`;
            }else if(itemsArray.length > 0){
                newElement.innerText = `[${itemsArray.length-1}]`;
                shift_previewNextElement.innerText = `[0]`;
            }
            pop_nextContainer.append(newElement);
            gsap.fromTo(newElement, {y: -300}, {y: 0, duration: .5});
            setTimeOutProcessing = !setTimeOutProcessing;
        }, 500);
    }
}

function previewNextElement_SHIFT(){
    if(setTimeOutProcessing === false){
        itemsArray = Array.from(item);
        
        setTimeOutProcessing =  true;
        const shift_previewNextElement = document.querySelector('.shift-item');
        gsap.fromTo(shift_previewNextElement, {y:0}, {y: 300, duration: .5});
        setTimeout(()=>{
            shift_previewNextElement.remove();
            const newElement = document.createElement('div');
            newElement.setAttribute('class', `small-item shift-item`);
            if(itemsArray.length === 0){
                newElement.innerText = `[ ]`;
            }else if(itemsArray.length > 0){
                newElement.innerText = `[0]`;
            }
            shift_nextContainer.append(newElement);
            gsap.fromTo(newElement, {y: -300}, {y: 0, duration: .5});
            setTimeOutProcessing = !setTimeOutProcessing;
        }, 500);

    }
}

function previewNextElement_UNSHIFT(){
    if(setTimeOutProcessing === false){
        itemsArray = Array.from(item);
        setTimeOutProcessing =  true;
        const unshift_previewNextElement = document.querySelector('.unshift-item');
        gsap.fromTo(unshift_previewNextElement, {y: 0}, {y: -300, duration: .5});
        setTimeout(()=>{
            unshift_previewNextElement.remove();
            const newElement = document.createElement('div');
            newElement.setAttribute('class', `small-item unshift-item`);
            newElement.innerText = `[0]`;
            unshift_nextContainer.append(newElement);
            gsap.fromTo(newElement, {y: 300}, {y: 0, duration: .5});
            setTimeOutProcessing = !setTimeOutProcessing;
        }, 500);

    }
}

//this updates the index on the previews next to the buttons. The next Array being pushed up.
function updateTheNextPreviewIndex(){
    itemsArray = Array.from(item);
    push_previewNextElement.innerText = `[${itemsArray.length}]`
}

function loadPageWithRandomArrayAmount(){
    let arrayAmount = Math.floor(Math.random() * 9) + 2;
    for(let i = 0; i <arrayAmount; i++){
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        arrayContainerOne.append(newItem);
    }
    //count the items in the array on update the Up Next previews
    itemsArray = Array.from(item);
    push_previewNextElement.innerText = `[${itemsArray.length}]`
    pop_previewNextElement.innerText = `[${itemsArray.length-1}]`;
    reorderIndexNumbers(time = 300);
}

function clear(){
    itemsArray = Array.from(item);
    const push_previewNextElement = document.querySelector('.push-item');
    const pop_previewNextElement = document.querySelector('.pop-item');
    const shift_previewNextElement = document.querySelector('.shift-item');
    if(itemsArray.length === 0){
        loadPageWithRandomArrayAmount();
    }
    itemsArray.forEach((element, index)=>{
        gsap.fromTo(element, {opacity:1, y:0}, {opacity: 0, y: 200, duration: .5});
    });
    //delay removing the elements to allow the animation to complete 
    setTimeout(()=>{
        itemsArray.forEach((element, index, itemsArray)=>{
            element.remove();
            if(index === itemsArray.length-1){
                loadPageWithRandomArrayAmount();
                itemsArray = Array.from(item);
                pop_previewNextElement.innerText = `[${itemsArray.length-1}]`;
                push_previewNextElement.innerText = `[${itemsArray.length}]`;
                shift_previewNextElement.innerText = `[0]`;
                removeUserStatus();
            }
        });
        
    }, 500);
    
}

function splice(){
    itemsArray = Array.from(item);
    if(itemsArray.length === 0){
        userStatus.innerText = 'Array is Empty!';
        userStatus.style.opacity = 1;
        return
    }
    //add pointer events back to allow user to select items to delete from Array
    itemsArray.forEach((item)=>{
        item.style.pointerEvents = 'auto';
    })
    removeClickedStyles();
    userStatus.style.color = 'black';
    userStatus.style.opacity = 1;
    isSpliceActive = false;
    userStatus.innerText = 'Please Select Start Index';
    arrayContainerOne.style.cursor = 'pointer';
    // arrayContainerOne.style.pointerEvents = 'auto'
    //remove styling 
    if(clickCountArray === 2){
        removeClickedStyles();
        clickCountArray = 0;
        arrayContainerOne.style.cursor = 'pointer';
        // arrayContainerOne.style.pointerEvents = 'auto';
    }
    
}

function UserSelectsItemsFromArray(e){
    if(isSpliceActive === false){
        let deleteCountNum; 
        if(clickCountArray < 2){
            if(e.target.classList[0] !== 'item' ) return
                clickCountArray++;
            if(clickCountArray === 1){
                addIdToAllElements();
                e.target.classList.add('item-selected');
                userStatus.innerText = 'Please select Range ( delete count )';
                firstElementClicked = e.target.id;
                //if array has one element, splice should delete the element upon user click
                if(itemsArray.length === 1){
                    arrayContainerOne.removeChild(item[firstElementClicked]);
                    userStatus.innerText = 'Single Element was removed!'
                } 
                reorderIndexNumbers(700);
            }else if(clickCountArray === 2){
                addIdToAllElements();
                SecondElementClicked = e.target.id;
                e.target.classList.add('item-selected');
                deleteCountNum = (parseInt(SecondElementClicked)+1) - firstElementClicked;
                userStatus.innerText = `Splice( index: ${firstElementClicked}, Delete Count: ${deleteCountNum})`;
                RemoveItemsUsingSplice(firstElementClicked, SecondElementClicked);
                reorderIndexNumbers(700);         
            }
        }
    } 
}




function RemoveItemsUsingSplice(firstIndex, secondIndex){
    isSpliceActive = true;
    arrayContainerOne.style.cursor = 'default';
    arrayContainerOne.style.pointerEvents = 'none';
    itemsArray = Array.from(item);
    const push_previewNextElement = document.querySelector('.push-item');
    const pop_previewNextElement = document.querySelector('.pop-item');
    const shift_previewNextElement = document.querySelector('.shift-item');
    if(parseInt(firstIndex) > parseInt(secondIndex)){
        userStatus.innerText = `INVALID INPUT - Click On Splice to Begin Again`;
        userStatus.style.opacity = 1;
        removeClickedStyles();
        arrayContainerOne.style.cursor = 'default';
        arrayContainerOne.style.pointerEvents = 'none';
    }  
    
    setTimeout(()=>{
        for(let i = parseInt(firstIndex); i <= parseInt(secondIndex); i++){
            gsap.fromTo(item[firstIndex], {opacity: 0, x:0}, {opacity: 1, x:-700, duration: .5});
            arrayContainerOne.removeChild(item[firstIndex]);
            setTimeOutProcessing = false;
            removeClickedStyles();
            reorderIndexNumbers(time = 800);
        }
        if(itemsArray.length === 0){
            pop_previewNextElement.innerText = `[ ]`;
            shift_previewNextElement.innerText = `[ ]`;
        }else if(itemsArray.length > 0){
            pop_previewNextElement.innerText = `[${itemsArray.length-1}]`;
        }
        push_previewNextElement.innerText = `[${itemsArray.length}]`;
       
    }, 500);
}

function removeClickedStyles (){
    clickCountArray = 0;
    itemsArray = Array.from(item);
    itemsArray.forEach((element, index)=>{
        element.classList.remove('item-selected');
    });
}

function addIdToAllElements(){
    itemsArray = Array.from(item);
    itemsArray.forEach((element, index)=>{
        element.setAttribute('id', index);
    });
}

function unshift(){
    removeUserStatus();
    let checkIfArrayIsFull = limitArrayAmount();
    if(checkIfArrayIsFull) {
        
        return 
    }
    const push_previewNextElement = document.querySelector('.push-item');
    const pop_previewNextElement = document.querySelector('.pop-item');
    const shift_previewNextElement = document.querySelector('.shift-item');

    itemsArray = Array.from(item);
    push_previewNextElement.innerText = `[${itemsArray.length + 1}]`
    pop_previewNextElement.innerText = `[${itemsArray.length}]`;
    shift_previewNextElement.innerText = `[0]`;
    removeUserStatus();
    const newItem = document.createElement('div');
    newItem.setAttribute('class', 'item');
    gsap.fromTo(newItem, {opacity: 0, x:-400}, {opacity: 1, x:0, duration: .5});
    arrayContainerOne.insertBefore(newItem, arrayContainerOne.children[0]);
    previewNextElement_UNSHIFT();
    reorderIndexNumbers(700);
    removeClickedStyles();
}

function shift(){
    removeUserStatus();
    itemsArray = Array.from(item);
    const push_previewNextElement = document.querySelector('.push-item');
    const pop_previewNextElement = document.querySelector('.pop-item');
    if(item.length === 0) return 
    
    if(setTimeOutProcessing === false){
        setTimeOutProcessing = true;
        gsap.fromTo(item[0], {opacity: 0, x:0}, {opacity: 1, x:-400, duration: .5});
        reorderIndexNumbers(700);
        setTimeout(()=>{
            arrayContainerOne.removeChild(item[0]);
            setTimeOutProcessing = !setTimeOutProcessing;
            previewNextElement_SHIFT();
            //update other arrays with appropriate information
            push_previewNextElement.innerText = `[${itemsArray.length}]`
            if(itemsArray.length === 0){
                pop_previewNextElement.innerText = `[ ]`;
            }else if(itemsArray.length > 0){
                pop_previewNextElement.innerText = `[${itemsArray.length-1}]`;
            }
            
            reorderIndexNumbers(700);
            removeClickedStyles();
        }, 400);
    }
    
}

function pop(){
    removeUserStatus();
    itemsArray = Array.from(item);
    const push_previewNextElement = document.querySelector('.push-item');
    const shift_previewNextElement = document.querySelector('.shift-item');
    if(item.length === 0) return 
    if(setTimeOutProcessing === false){
        setTimeOutProcessing = true;
        gsap.fromTo(item[item.length-1], {opacity: 0, x:0}, {opacity: 1, x:800, duration: .5});
        setTimeout(()=>{
            arrayContainerOne.removeChild(item[item.length-1]);
            setTimeOutProcessing = !setTimeOutProcessing;
            push_previewNextElement.innerText = `[${itemsArray.length-1}]`;

            // push_previewNextElement.innerText = 'hello';
            previewNextElement_POP()
            reorderIndexNumbers(700);
            removeClickedStyles();
         }, 400);
    }
}

function push(){
    removeUserStatus();
    const push_previewNextElement = document.querySelector('.push-item');
    const pop_previewNextElement = document.querySelector('.pop-item');
    itemsArray = Array.from(item);
    let checkIfArrayIsFull = limitArrayAmount();
    if(checkIfArrayIsFull) return 

    const newItem = document.createElement('div');
    newItem.setAttribute('class', 'item');
    gsap.fromTo(newItem, {opacity: 0, x:800}, {opacity: 1, x:0, duration: 0.5});
    arrayContainerOne.append(newItem);
    pop_previewNextElement.innerText = `[${itemsArray.length}]`;
    previewNextElement_PUSH();
    reorderIndexNumbers(700);
    removeClickedStyles();
}

function reorderIndexNumbers(time){
    setTimeout(()=>{
        itemsArray = Array.from(item);
        itemsArray.forEach((element, index)=> {
        // element.classList.add(index);
        element.innerText = `[${index}]`;
        });
    }, time)
}

function oddEvenColorShift(element, index){
    if(index % 2 === 0){
        element.style.backgroundColor = 'grey';
    }else if(index % 2 === 1){
        element.style.backgroundColor = 'blue';
    }
}

function removeUserStatus(){
    userStatus.style.opacity = 0;
    clickCountArray = 2;
}

function limitArrayAmount(){
    itemsArray = Array.from(item);

    if(itemsArray.length === 13){
        //array is now full! 
        userStatus.style.opacity = 1;
        userStatus.innerHTML = 'Array is Full';
        return true
    }else if(itemsArray.length <= 13){
        //array is not full 
        return false;
    }
}
