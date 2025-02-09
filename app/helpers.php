<?php

function convertToDate($inputDate) {
	$timestamp = strtotime($inputDate);	// Attempt to parse the date using strtotime

	if ($timestamp === false) 			// Check if strtotime returned a valid timestamp
		throw new InvalidArgumentException("Invalid date format");

	// Format the timestamp into the desired format
	return date('Y-m-d', $timestamp);
}
