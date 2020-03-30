jQuery(function($) {
  $('#begining-date,#end-date').datepicker({
    dateFormat: "yy-mm-dd"
  })
  $('.modify-todo').dblclick(function(){
    let actualValue = $(this).text()
    let modifyTodoInput = $('<form><input type="text" class="to-do-input"></form>')
    $(this).html(modifyTodoInput)
    $('.to-do-input').val(actualValue)
  })
  $('body').click(function(){
    
  })
  $('.item-row > td').dblclick(function(){
    console.log($(this).text())
  })
  $('.delete').on('click', function(){
    let id = $(this).prev().val()
    let grandParent = $(this).parent().parent()
    $.post('/deletetodo',{list_id:id},function(){
      grandParent.fadeOut()
    })
  })
  $('.new-step').click(function(){
    $('#add-step-form').fadeToggle()
  })
  $('.steps-cont').hover(function(){
  	var delSteps = $(this).find('.del-steps')
  	delSteps.fadeIn()
  },function(){
	$('.del-steps').hide()
  })
  $('.del-steps').on('click',function(){
    let list_id = $(this).prev().prev().val()
  	let step_id = $(this).prev().val()
  	var grandParent = $(this).parent().parent()
  	$.post('/deletesteps',{list_id:list_id,step_id:step_id},function(){
      grandParent.fadeOut()
  	})
  })
})