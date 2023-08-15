  // function renderCartItems() {
  //   $('#cart').remove();

  //   var cartCard = $('<div>', { class: classNames.card, id: 'cart' });
  //   cartCard.append($('<div>', { class: classNames.cardTop }).append($('<img>', { src: logoPath, class: classNames.cardTopLogo })));
  //   cartCard.append($('<div>', { class: classNames.cardTitle }).text('Your cart').append($('<span>', { class: classNames.cardTitleAmount }).text(formatPrice(getTotalCartItemsPrice()))));
  //   if (cartItems.length === 0) {
  //     cartCard.append($('<div>', { class: classNames.cartCardBody })
  //             .append($('<div>', { class: classNames.cartEmpty })
  //             .append($('<p>', { class: classNames.cartEmptyText })
  //             .text('Your cart is empty.'))));
      
  //     // cartCardBody.append($('<div>', { class: classNames.cartEmpty }).append($('<p>', { class: classNames.cartEmptyText }).text('Your cart is empty.')));
  //   }
  //   else {
  //     // console.log('cart +1');
  //     var cartCardBody = $('<div>', { class: classNames.cartCardBody });
  //     // console.log(cartItems);
  //     // var cartItemsList = $("<div>").addClass(classNames.cartItems);

  //     for (var i = 0; i < cartItems.length; i++) {
  //       var item = cartItems[i];
  //       var cartItem = $("<div>").addClass(classNames.cartItem).attr("data-id", item.id);

  //       var cartItemLeft = $("<div>").addClass(classNames.cartItemLeft);
  //       var cartItemImage = $("<div>")
  //         .addClass(classNames.cartItemImage)
  //         .css("backgroundColor", item.color)
  //         .append($("<div>").addClass(classNames.cartItemImageBlock).append($("<img>").attr("src", item.image)));

  //       cartItemLeft.append(cartItemImage);

  //       var cartItemRight = $("<div>").addClass(classNames.cartItemRight);
  //       var cartItemName = $("<div>").addClass(classNames.cartItemName).text(item.name);
  //       var cartItemPrice = $("<div>").addClass(classNames.cartItemPrice).text(formatPrice(item.price));

  //       var cartItemActions = $("<div>").addClass(classNames.cartItemActions);
  //       var cartItemCount = $("<div>").addClass(classNames.cartItemCount);

  //       var decrementButton = $("<div>")
  //         .addClass(classNames.cartItemCountButton)
  //         // .addClass(classNames.decrementButton)
  //         .attr("data-id", item.id)
  //         .attr("data-action", "decrement")
  //         .text("-");
  //       var cartItemCountNumber = $("<div>").addClass(classNames.cartItemCountNumber).text(item.count);
  //       var incrementButton = $("<div>")
  //         .addClass(classNames.cartItemCountButton)
  //         // .addClass(classNames.incrementButton)
  //         .attr("data-id", item.id)
  //         .attr("data-action", "increment")
  //         .text("+");
        
  //       var cartItemRemove = $("<div>")
  //         .addClass(classNames.cartItemRemove)
  //         .attr("data-id", item.id)
  //         .attr("data-action", "pop")
  //         .append($('<img>', { src: removePath}));
  //       cartItemCount.append(decrementButton, cartItemCountNumber, incrementButton);

  //       var cardTitleAmount = $(`.${classNames.cardTitleAmount}`)
  //         .text(formatPrice(getTotalCartItemsPrice()));

  //       cartItemActions.append(cartItemCount, cartItemRemove);
  //       cartItemRight.append(cartItemName, cartItemPrice, cartItemActions);
  //       cartItem.append(cartItemLeft, cartItemRight);

  //       cartCardBody.append(cartItem);
  //     }
  //     // cartCardBody.append(cartItemsList);
  //     cartCard.append(cartCardBody);
  //   }
    
  //   var mainContent = $(`.${classNames.mainContent}`);
  //   mainContent.append(cartCard);
  // }