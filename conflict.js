$.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    $('#stock-view').append(JSON.stringify (response) );
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function (response) {
        $('#stock-view').append(JSON.stringify (response) );
        $.ajax({
            url: queryURL,
            method: 'GET'
          }).then(function (response) {
            $('#stock-view').append(JSON.stringify (response) );
            $.ajax({
                url: queryURL,
                method: 'GET'
              }).then(function (response) {
                $('#stock-view').append(JSON.stringify (response) );
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                  }).then(function (response) {
                    $('#stock-view').append(JSON.stringify (response) );
                                          