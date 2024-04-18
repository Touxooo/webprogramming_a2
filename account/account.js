$(document).ready(function(){
    $('#dob').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        endDate: '-0d',
        maxDate: new Date()
    });
});