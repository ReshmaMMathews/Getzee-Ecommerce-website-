var updateBtns = document.getElementsByClassName('update-cart')

for (var i=0; i<updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'action:', action)

        /* checking user status on click */
        console.log('USER:', user)
        if (user == 'AnonymousUser'){
            addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action)    /* passing the function updateUserOrder so it gets called when the user is logged in*/
        }
    })
}

function addCookieItem(productId, action){
    console.log('Not logged in...')

    if (action=='add'){
        if (cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }

    if (action == 'remove'){
        cart[productId]['quantity'] -= 1

        if (cart[productId]['quantity'] <= 0){
            console.log('Remove item')
            delete cart[productId]        
        }
    }

    console.log('Cart:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/"
    location.reload()
}





/* defining this function with 2 parameters: productId and action */
function updateUserOrder(productId, action){
    console.log('User is authenticated, sending data.....')

    var url = '/update_item'
    
    /* create and use the fetch api to send a POST request */
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,  /* after passing the csrf token inside main.html, send it */
        },

        /* converting(stringify) and sending our productId and action as a json object */
        body: JSON.stringify({'productId': productId, 'action': action})
    })

    .then((response) => {
        return response.json();
    })

    .then((data) => {
        console.log('data:', data)
        location.reload()
    });
}

