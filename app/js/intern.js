var classNames = {
    mainContent: "App_mainContent_12BYb",
    wave: "App_wave_3CtRm",
    card: "App_card_38zmH",
    cardTop: "App_cardTop_3hHIG",
    cardTopLogo: "App_cardTopLogo_2ho9K",
    cardTitle: "App_cardTitle_29nyq",
    cardTitleAmount: "App_cardTitleAmount_17QFR",
    cardBody: "App_cardBody_1tfYc",
    shopItem: "App_shopItem_3FgVU",
    shopItemImage: "App_shopItemImage_341iU",
    shopItemName: "App_shopItemName_1_FJR",
    shopItemDescription: "App_shopItemDescription_1EIVK",
    shopItemBottom: "App_shopItemBottom_3401_",
    shopItemPrice: "App_shopItemPrice_2SLiG",
    shopItemButton: "App_shopItemButton_23FO1",
    inactive: "App_inactive_19f0W",
    shopItemButtonCover: "App_shopItemButtonCover_1bH2R",
    shopItemButtonCoverCheckIcon: "App_shopItemButtonCoverCheckIcon_18IzJ",
    cartEmpty: "App_cartEmpty_xgWCN",
    cartEmptyText: "App_cartEmptyText_2mtqJ",
    cartItem: "App_cartItem_lfA9I",
    cartItemLeft: "App_cartItemLeft_1HqDk",
    cartItemRight: "App_cartItemRight_2LNcC",
    cartItemName: "App_cartItemName_3he6M",
    cartItemPrice: "App_cartItemPrice_R0sr2",
    cartItemActions: "App_cartItemActions_13kia",
    cartItemCount: "App_cartItemCount_1GCCN",
    cartItemCountNumber: "App_cartItemCountNumber_1Evq9",
    cartItemCountButton: "App_cartItemCountButton_Gr8VG",
    cartItemRemove: "App_cartItemRemove_1GiLR",
    cartItemImage: "App_cartItemImage_1rLvq",
    cartItemImageBlock: "App_cartItemImageBlock_wRE4E"
};

var cartItems = [];
var logoPath = 'assets/nike.png';
var removePath = 'assets/trash.png';
var minusPath = 'assets/minus.png';
var plusPath = 'assets/plus.png';
var checkPath = 'assets/check.png';

$(document).ready(function() {
  $.ajax({
    url: 'https://goldensneaker.onrender.com/cart/get-all-items', // Địa chỉ endpoint của API GET
    method: 'GET',
    success: function(response) {
      cartItems = response; // Gán dữ liệu từ response cho biến cartItems
      // console.log(cartItems); // Dữ liệu đã được gán
        $.getJSON('data/shoes.json', function(data) {
        var shoes = data.shoes;

        // Create the main container
        var mainContent = $('<div>', { class: classNames.mainContent });

        // Create the products card
        var productsCard = $('<div>', { class: classNames.card });
        productsCard.append($('<div>', { class: classNames.cardTop }).append($('<img>', { src: logoPath, class: classNames.cardTopLogo })));
        productsCard.append($('<div>', { class: classNames.cardTitle }).text('Our Products'));

        var productsCardBody = $('<div>', { class: classNames.cardBody, id: 'product' });
        // console.log('1: ', cartItems.length);
        // Generate the shoe items
        for (var i = 0; i < shoes.length; i++) {
          var shoe = shoes[i];
          var shopItem = $('<div>', { class: classNames.shopItem, id: shoe.id });

          var shopItemImage = $('<div>', { class: classNames.shopItemImage }).css('background-color', shoe.color);
          shopItemImage.append($('<img>', { src: shoe.image }));

          var shopItemName = $('<div>', { class: classNames.shopItemName }).text(shoe.name);
          var shopItemDescription = $('<div>', { class: classNames.shopItemDescription }).text(shoe.description);

          var shopItemBottom = $('<div>', { class: classNames.shopItemBottom });
          shopItemBottom.append($('<div>', { class: classNames.shopItemPrice }).text('$' + shoe.price.toFixed(2)));

          function createAddToCartHandler(selectedShoe) {
            return function() {
              addToCart(selectedShoe);
            };
          }
          var hasId = cartItems.some(item => item.id === shoe.id);
          // console.log(hasId);
          var addToCartButton = $("<div>")
            .addClass(classNames.shopItemButton)
            .addClass(hasId ? classNames.inactive : "")
            .on("click", createAddToCartHandler(shoe))
            .append(
              hasId
                ? $("<div>").addClass(classNames.shopItemButtonCover).append($("<div>").addClass(classNames.shopItemButtonCoverCheckIcon))
                : $("<p>").text("ADD TO CART")
            );
          shopItemBottom.append(addToCartButton);

          shopItem.append(shopItemImage, shopItemName, shopItemDescription, shopItemBottom);
          productsCardBody.append(shopItem);
        }

        productsCard.append(productsCardBody);

        var cartCard = $('<div>', { class: classNames.card, id: 'cart' });
        cartCard.append($('<div>', { class: classNames.cardTop }).append($('<img>', { src: logoPath, class: classNames.cardTopLogo })));
        cartCard.append($('<div>', { class: classNames.cardTitle }).text('Your cart').append($('<span>', { class: classNames.cardTitleAmount }).text(formatPrice(getTotalCartItemsPrice()))));
        
        if (cartItems.length === 0) {
          renderEmptyCart(cartCard);
        } else {
          renderNonEmptyCart(cartCard);
        }

        mainContent.append(productsCard);
        mainContent.append(cartCard);

        // Replace the body content with the generated HTML
        $('#app').html(mainContent);
        // renderCartItems();
      });
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
  
  function formatPrice(price) {
    return "$" + parseFloat(price).toFixed(2);
  }

  function renderShopItem(shoe) {
    var shopItem = $('<div>', { class: classNames.shopItem, id: shoe.id });

    var shopItemImage = $('<div>', { class: classNames.shopItemImage }).css('background-color', shoe.color);
    shopItemImage.append($('<img>', { src: shoe.image }));

    var shopItemName = $('<div>', { class: classNames.shopItemName }).text(shoe.name);
    var shopItemDescription = $('<div>', { class: classNames.shopItemDescription }).text(shoe.description);

    var shopItemBottom = $('<div>', { class: classNames.shopItemBottom });
    shopItemBottom.append($('<div>', { class: classNames.shopItemPrice }).text(formatPrice(shoe.price)));

      function createAddToCartHandler(selectedShoe) {
        return function() {
          addToCart(selectedShoe);
        };
    }

    var addToCartButton = $("<div>")
      .addClass(classNames.shopItemButton)
      .addClass(shoe.inCart ? classNames.inactive : "")
      .on("click", createAddToCartHandler(shoe))
      .append(
        shoe.inCart
          ? $("<div>").addClass(classNames.shopItemButtonCover).append($("<div>").addClass(classNames.shopItemButtonCoverCheckIcon))
          : $("<p>").text("ADD TO CART")
      );
    shopItemBottom.append(addToCartButton);

    shopItem.append(shopItemImage, shopItemName, shopItemDescription, shopItemBottom);
    $(`#${shoe.id}`).replaceWith(shopItem);
  }

  function renderEmptyCart(cartCard) {
    var cartCardBody = $('<div>', { class: classNames.cardBody, id: 'cartItem' });
    cartCardBody.append(
      $('<div>', { class: classNames.cartEmpty }).append(
        $('<p>', { class: classNames.cartEmptyText }).text('Your cart is empty.')
      )
    );
    cartCard.append(cartCardBody);
  }

  function renderNonEmptyCart(cartCard) {
    var cartCardBody = $('<div>', { class: classNames.cardBody, id: 'cartItem' });

    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      
      var cartItem = $("<div>").addClass(classNames.cartItem).attr("data-id", item.id);

      var cartItemLeft = $("<div>").addClass(classNames.cartItemLeft);
      var cartItemImage = $("<div>")
        .addClass(classNames.cartItemImage)
        .css("backgroundColor", item.color)
        .append($("<div>").addClass(classNames.cartItemImageBlock).append($("<img>").attr("src", item.image)));

      cartItemLeft.append(cartItemImage);

      var cartItemRight = $("<div>").addClass(classNames.cartItemRight);
      var cartItemName = $("<div>").addClass(classNames.cartItemName).text(item.name);
      var cartItemPrice = $("<div>").addClass(classNames.cartItemPrice).text(formatPrice(item.price));

      var cartItemActions = $("<div>").addClass(classNames.cartItemActions);
      var cartItemCount = $("<div>").addClass(classNames.cartItemCount);

      var decrementButton = $("<div>")
        .addClass(classNames.cartItemCountButton)
        // .addClass(classNames.decrementButton)
        .attr("data-id", item.id)
        .attr("data-action", "decrement")
        .text("-");
      var cartItemCountNumber = $("<div>").addClass(classNames.cartItemCountNumber).text(item.count);
      var incrementButton = $("<div>")
        .addClass(classNames.cartItemCountButton)
        // .addClass(classNames.incrementButton)
        .attr("data-id", item.id)
        .attr("data-action", "increment")
        .text("+");
      
      var cartItemRemove = $("<div>")
        .addClass(classNames.cartItemRemove)
        .attr("data-id", item.id)
        .attr("data-action", "pop")
        .append($('<img>', { src: removePath}));
      cartItemCount.append(decrementButton, cartItemCountNumber, incrementButton);

      var cardTitleAmount = $(`.${classNames.cardTitleAmount}`)
        .text(formatPrice(getTotalCartItemsPrice()));

      cartItemActions.append(cartItemCount, cartItemRemove);
      cartItemRight.append(cartItemName, cartItemPrice, cartItemActions);
      cartItem.append(cartItemLeft, cartItemRight);

      cartCardBody.append(cartItem);
    }
    // cartCardBody.append(cartItemsList);
    cartCard.append(cartCardBody);
  }

  function appendCartItemToCartCardBody(item) {
    var cartItem = $("<div>").addClass(classNames.cartItem).attr("data-id", item.id);

    var cartItemLeft = $("<div>").addClass(classNames.cartItemLeft);
    var cartItemImage = $("<div>")
      .addClass(classNames.cartItemImage)
      .css("backgroundColor", item.color)
      .append($("<div>").addClass(classNames.cartItemImageBlock).append($("<img>").attr("src", item.image)));

    cartItemLeft.append(cartItemImage);

    var cartItemRight = $("<div>").addClass(classNames.cartItemRight);
    var cartItemName = $("<div>").addClass(classNames.cartItemName).text(item.name);
    var cartItemPrice = $("<div>").addClass(classNames.cartItemPrice).text(formatPrice(item.price));

    var cartItemActions = $("<div>").addClass(classNames.cartItemActions);
    var cartItemCount = $("<div>").addClass(classNames.cartItemCount);

    var decrementButton = $("<div>")
      .addClass(classNames.cartItemCountButton)
      .attr("data-id", item.id)
      .attr("data-action", "decrement")
      .text("-");
    var cartItemCountNumber = $("<div>").addClass(classNames.cartItemCountNumber).text(item.count);
    var incrementButton = $("<div>")
      .addClass(classNames.cartItemCountButton)
      .attr("data-id", item.id)
      .attr("data-action", "increment")
      .text("+");

    var cartItemRemove = $("<div>")
      .addClass(classNames.cartItemRemove)
      .attr("data-id", item.id)
      .attr("data-action", "pop")
      .append($('<img>', { src: removePath }));
    cartItemCount.append(decrementButton, cartItemCountNumber, incrementButton);

    var cardTitleAmount = $(`.${classNames.cardTitleAmount}`)
      .text(formatPrice(getTotalCartItemsPrice()));

    cartItemActions.append(cartItemCount, cartItemRemove);
    cartItemRight.append(cartItemName, cartItemPrice, cartItemActions);
    cartItem.append(cartItemLeft, cartItemRight);

    $(`[data-id="${item.id}"]`).replaceWith(cartItem);
  }


  function uppdateEmptyCart() {
    var cartEmpty = $('<div>', { class: classNames.cartEmpty });
    cartEmpty.append(
        $('<p>', { class: classNames.cartEmptyText }).text('Your cart is empty.')
    );
    // Replace the content of #cartCardBody with emptyCartCardBody
    $('#cartItem').append(cartEmpty);
  }

  function addToCart(item) {
    if (item && !item.inCart) {
      item.inCart = true;
      // item.count = 1;
      // console.log(item);
      var newItem = $.extend({}, item, { count: 1 });
      cartItems.push(newItem);
      // console.log(newItem);

      $.ajax({
        url: 'https://goldensneaker.onrender.com/cart/add-item', // Địa chỉ endpoint của API POST
        method: 'POST',
        data: JSON.stringify(newItem), // Dữ liệu bạn muốn gửi đi
        contentType: "application/json",
        success: function(response) {
          // console.log(response); // Xử lý kết quả trả về từ máy chủ
          renderShopItem(newItem);
          var cartItem = $("<div>").addClass(classNames.cartItem).attr("data-id", item.id);

          var cartItemLeft = $("<div>").addClass(classNames.cartItemLeft);
          var cartItemImage = $("<div>")
            .addClass(classNames.cartItemImage)
            .css("backgroundColor", item.color)
            .append($("<div>").addClass(classNames.cartItemImageBlock).append($("<img>").attr("src", item.image)));

          cartItemLeft.append(cartItemImage);

          var cartItemRight = $("<div>").addClass(classNames.cartItemRight);
          var cartItemName = $("<div>").addClass(classNames.cartItemName).text(item.name);
          var cartItemPrice = $("<div>").addClass(classNames.cartItemPrice).text(formatPrice(item.price));

          var cartItemActions = $("<div>").addClass(classNames.cartItemActions);
          var cartItemCount = $("<div>").addClass(classNames.cartItemCount);

          var decrementButton = $("<div>")
            .addClass(classNames.cartItemCountButton)
            .attr("data-id", item.id)
            .attr("data-action", "decrement")
            .text("-");
          var cartItemCountNumber = $("<div>").addClass(classNames.cartItemCountNumber).text(1);
          var incrementButton = $("<div>")
            .addClass(classNames.cartItemCountButton)
            .attr("data-id", item.id)
            .attr("data-action", "increment")
            .text("+");

          var cartItemRemove = $("<div>")
            .addClass(classNames.cartItemRemove)
            .attr("data-id", item.id)
            .attr("data-action", "pop")
            .append($('<img>', { src: removePath }));
          cartItemCount.append(decrementButton, cartItemCountNumber, incrementButton);

          var cardTitleAmount = $(`.${classNames.cardTitleAmount}`)
            .text(formatPrice(getTotalCartItemsPrice()));

          cartItemActions.append(cartItemCount, cartItemRemove);
          cartItemRight.append(cartItemName, cartItemPrice, cartItemActions);
          cartItem.append(cartItemLeft, cartItemRight);

          if (cartItems.length === 1) {
            $(`.${classNames.cartEmpty}`).replaceWith(cartItem);
          }
          else{
            $('#cartItem').append(cartItem);
          }
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
    }
  }

  function decrement(item) {
    item.count = Math.max(0, item.count - 1);
    console.log('max: ', item.count);
    if (item.count === 0) {
      pop(item);
      // $.ajax({
      //   url: `https://goldensneaker.onrender.com/cart/delete-item/${item.id}`,
      //   method: 'DELETE',
      //   success: function(response) {
      //     // Remove the cart item from the cartCardBody based on data-id
      //     $(`[data-id="${item.id}"]`).remove();

      //     // Perform the GET request to update cartItems
      //     $.ajax({
      //       url: 'https://goldensneaker.onrender.com/cart/get-all-items',
      //       method: 'GET',
      //       success: function(response) {
      //         cartItems = response;
      //         console.log('items-d: ', cartItems);
      //         // Update UI based on updated cartItems
      //         if (cartItems.length === 0) {
      //           uppdateEmptyCart();
      //         }

      //         // Update total amount
      //         $(`.${classNames.cardTitleAmount}`).text(formatPrice(getTotalCartItemsPrice()));

      //         // Render shop item
      //         renderShopItem(item);
      //       },
      //       error: function(error) {
      //         console.error('Error:', error);
      //       }
      //     });
      //   },
      //   error: function(error) {
      //     console.error('Error:', error);
      //   }
      // });
    } 
    else{
      const updatedItem = {
        id: item.id,
        count: item.count
      };

      $.ajax({
        url: 'https://goldensneaker.onrender.com/cart/update-count',
        method: 'PUT',
        data: JSON.stringify(updatedItem), // Dữ liệu bạn muốn gửi đi
        contentType: "application/json",
        success: function(response) {
          $(`[data-id="${item.id}"] .${classNames.cartItemRight} .${classNames.cartItemActions} .${classNames.cartItemCount} .${classNames.cartItemCountNumber}`).text(item.count);

          // Perform the GET request to update cartItems
          $.ajax({
            url: 'https://goldensneaker.onrender.com/cart/get-all-items',
            method: 'GET',
            success: function(response) {
              cartItems = response;
              console.log('items-u: ', cartItems);
              // Update UI based on updated cartItems
              if (cartItems.length === 0) {
                uppdateEmptyCart();
              }

              // Update total amount
              $(`.${classNames.cardTitleAmount}`).text(formatPrice(getTotalCartItemsPrice()));

              // Render shop item
              renderShopItem(item);
            },
            error: function(error) {
              console.error('Error:', error);
            }
          });
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
    }
  }


  function increment(item) {
    item.count++;
    var updatedItem = {};
    updatedItem.id = item.id;
    updatedItem.count = item.count; 
    $.ajax({
      url: 'https://goldensneaker.onrender.com/cart/update-count', // Địa chỉ endpoint của API PUT
      method: 'PUT',
      data: JSON.stringify(updatedItem), // Dữ liệu bạn muốn gửi đi
      contentType: "application/json", 
      success: function(response) {
        // console.log(response); // Xử lý kết quả trả về từ máy chủ
        appendCartItemToCartCardBody(item);
        renderShopItem(item);
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  }

  function pop(item) {
    item.count = 0;
    item.inCart = false;

    // Step 1: Perform the DELETE request
    $.ajax({
      url: `https://goldensneaker.onrender.com/cart/delete-item/${item.id}`,
      method: 'DELETE',
      success: function(response) {
        // Remove the cart item from the cartCardBody based on data-id
        $(`[data-id="${item.id}"]`).remove();
        
        // Step 2: Perform the GET request to update cartItems
        $.ajax({
          url: 'https://goldensneaker.onrender.com/cart/get-all-items',
          method: 'GET',
          success: function(response) {
            cartItems = response;
            
            // Update UI based on updated cartItems
            if (cartItems.length === 0) {
              uppdateEmptyCart();
            }
            
            // Update total amount
            $(`.${classNames.cardTitleAmount}`).text(formatPrice(getTotalCartItemsPrice()));
            
            // Render shop item
            renderShopItem(item);
          },
          error: function(error) {
            console.error('Error:', error);
          }
        });
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  }

  function getTotalCartItemsPrice() {
    console.log(cartItems.length);
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      total += item.price * item.count;
    }
    return total;
  }

  $(document).on("click", `.${classNames.cartItemCountButton}[data-action='decrement']`, function() {
    var itemId = $(this).data("id");
    var selectedItem = cartItems.find(function(item) {
      return item.id === itemId;
    });
    decrement(selectedItem);
  });

  $(document).on("click", `.${classNames.cartItemCountButton}[data-action='increment']`, function() {
    var itemId = $(this).data("id");
    var selectedItem = cartItems.find(function(item) {
      return item.id === itemId;
    }); 
    increment(selectedItem);
  });

  $(document).on("click", `.${classNames.cartItemRemove}[data-action='pop']`, function() {
    var itemId = $(this).data("id");
    var selectedItem = cartItems.find(function(item) {
      return item.id === itemId;
    }); 
    pop(selectedItem);
  });
});

