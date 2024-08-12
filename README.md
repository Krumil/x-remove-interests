# Twitter Interests Unchecking Tool

This is a simple JavaScript tool designed to uncheck all Twitter interest checkboxes on the Twitter (X) data settings page. It simulates human-like behavior by adding delays between actions and provides a summary of the process.

## Purpose

This tool helps users quickly opt out of all Twitter interests, which can be tedious to do manually, especially for accounts with many interests selected.

## Usage

1. Navigate to [https://x.com/settings/your_twitter_data/twitter_interests](https://x.com/settings/your_twitter_data/twitter_interests) in your web browser.
2. Open your browser's developer console:
   - Chrome/Edge: Press F12 or right-click and select "Inspect", then click on "Console"
   - Firefox: Press F12 or right-click and select "Inspect Element", then click on "Console"
   - Safari: Enable the Develop menu in Preferences > Advanced, then select Develop > Show JavaScript Console
3. Copy and paste the following script into the console:

```javascript
function uncheckAllCheckboxes(delay = 500, maxRetries = 3) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let index = 0;
  let uncheckedCount = 0;
  let skippedCount = 0;
  let retryCount = 0;

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
        try {
          simulateClick(checkboxes[index]);
          if (!checkboxes[index].checked) {
            uncheckedCount++;
            console.log(`Unchecked interest ${index + 1} of ${checkboxes.length}`);
            retryCount = 0;
          } else {
            throw new Error('Checkbox did not uncheck');
          }
        } catch (error) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retry attempt ${retryCount} for interest ${index + 1}`);
            setTimeout(uncheckNext, delay * 2);
            return;
          } else {
            console.log(`Failed to uncheck interest ${index + 1} after ${maxRetries} attempts`);
            retryCount = 0;
          }
        }
      } else {
        skippedCount++;
      }
      index++;
      setTimeout(uncheckNext, delay);
    } else {
      console.log(`Finished processing ${checkboxes.length} interests:`);
      console.log(`- Unchecked: ${uncheckedCount}`);
      console.log(`- Already unchecked (skipped): ${skippedCount}`);
    }
  }

  uncheckNext();
}

// Run the function with a 500ms delay between each checkbox and max 3 retries
uncheckAllCheckboxes(500, 3);
```

4. Press Enter to run the script.

## Features

- Simulates human-like clicking behavior
- Adds a delay between each action to avoid overwhelming the Twitter API
- Skips already unchecked interests
- Provides a summary of unchecked and skipped interests
- Implements a retry mechanism for potential API overload situations

## Customization

You can adjust the delay between actions and the maximum number of retries by modifying the values in the last line of the script:

```javascript
uncheckAllCheckboxes(500, 3);
```

- The first parameter (500) is the delay in milliseconds between each action.
- The second parameter (3) is the maximum number of retries for each checkbox if the unchecking fails.

## Disclaimer

This script is provided as-is and is not officially associated with Twitter (X). Use it at your own risk. Be aware that rapidly changing many settings might be rate-limited by Twitter's systems.

## Contributing

Feel free to fork this repository and submit pull requests with improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
