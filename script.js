function uncheckAllCheckboxes(delay = 500) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let index = 0;
  let uncheckedCount = 0;
  let skippedCount = 0;

  function simulateClick(checkbox) {
    const evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    checkbox.dispatchEvent(evt);
  }

  function uncheckNext() {
    if (index < checkboxes.length) {
      if (checkboxes[index].checked) {
        simulateClick(checkboxes[index]);
        uncheckedCount++;
        console.log(`Unchecked checkbox ${index + 1} of ${checkboxes.length}`);
      } else {
        skippedCount++;
      }
      index++;
      setTimeout(uncheckNext, delay);
    } else {
      console.log(`Finished processing ${checkboxes.length} checkboxes:`);
      console.log(`- Unchecked: ${uncheckedCount}`);
      console.log(`- Already unchecked (skipped): ${skippedCount}`);
    }
  }

  uncheckNext();
}

// Run the function with a 500ms delay between each checkbox
uncheckAllCheckboxes(500);
