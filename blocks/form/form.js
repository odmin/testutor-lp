document.formData = {
  "quan1": "1 000",
  "quan2": "2 000",
  "quan3": "30 000",
  "quan4": "40 000",
  "quan5": "50 000",
};
$('.form-form').on('change', '.form-form__logic_money', function () {
  console.log('changed');
  var cursor = $(this).attr('id');
  $(this).parents('.form-form').find('.bonus').each(function () {
    $(this).hide(150);
    if ($(this).attr('for') == cursor) {
      $(this).show(300);
    }
  })
  var total = document.formData[$(this).attr('id')];
  $(this).parents('.form-form').find('.total').text(total);

});
