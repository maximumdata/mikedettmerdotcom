let months = {
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
}

const $ = window.$ || window.jQuery
$('[data-toggle="datepicker"]').datepicker()

$('form').on('submit', (e) => {
  e.preventDefault()
  let obj = {
    name: $('#name').val(),
    month: $('#month').val(),
    monthNum: months[$('#month').val().toLowerCase()],
    desc: $('#desc').val(),
    brewDate: new Date($('#brewDate').val()),
    rackDate: new Date($('#rackDate').val()),
    bottleDate: new Date($('#bottleDate').val()),
    fridgeDate: new Date($('#fridgeDate').val()),
    releaseDate: new Date($('#releaseDate').val()),
    grains: $('#grains').val(),
    malts: $('#malts').val(),
    hops: $('#hops').val(),
    isVF: $('#isVF').prop('checked')
  }
  console.log(obj)
})
