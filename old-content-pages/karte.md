---
title: Karte
slug: karte
image: null
date: 2015-09-28T15:18:17.000Z
author: linus-huesler
description: ''
categories: []
---

[map animation="fadeInUp" height="550px" width="100%" url="https://maps.google.com/maps?q=Apptiva AG, Neuenkirchstrasse 19, Sempach Station&hl=de&geocode=+&hnear=Apptiva AG+Neuenkirchstrasse 19,+Sempach Station&t=m&z=10&iwloc=A"]
<style>
    .scrolloff {
        pointer-events: none;
    }
</style>
<script>
$('#karte > .container').addClass('row').removeClass('container');
// you want to enable the pointer events only on click;
var map_iframe = $('.rnr-google-map > iframe');
map_iframe.addClass('scrolloff'); // set the pointer events to none on doc ready
$('.rnr-google-map').on('click', function () {map_iframe.removeClass('scrolloff');});
// you want to disable pointer events when the mouse leave the canvas area;
map_iframe.mouseleave(function () {
  map_iframe.addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
});
</script>