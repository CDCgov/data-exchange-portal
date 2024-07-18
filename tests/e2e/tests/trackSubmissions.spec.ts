import { test, expect, Page } from '@playwright/test';
import { login } from '../util/helpers';


test.describe('Sorting the table on Track Submissions page', () => {
  let loggedInPage: Page;

  test.beforeAll(async ({ page }) => {
    // Log in and navigate to the track submissions page once before all tests
    loggedInPage = page;
    await login(loggedInPage);
    await loggedInPage.goto('https://dexdev.cdc.gov/home/submissions?data_stream_id=aims-celr&data_route=All&timeframe=Last+30+Days');
    // Verify that the 'Track Submissions' header is visible
    const trackSubmissionsHeader = loggedInPage.locator('//h1[text()="Track Submissions"]');
    await expect(trackSubmissionsHeader).toBeVisible();
  });

  test('verify ascending order sorting by File Name', async () => {
    // Click the File Name column header to sort in ascending order
    const fileNameSortingIcon = loggedInPage.locator("//span[text()='File Name']");
    await fileNameSortingIcon.click();

    
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the File Name column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(1)', elements =>
      elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Check if the array is sorted in ascending alphabetical order
    const isSorted = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted
    expect(isSorted(texts)).toBe(true);
  });

  test('verify descending order sorting by File Name', async () => {
    // Click the File Name column header again to sort in descending order
    const fileNameSortingIcon = loggedInPage.locator("//span[text()='File Name']");
    await fileNameSortingIcon.click();

    
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the File Name column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(1)', elements =>
      elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Check if the array is sorted in descending alphabetical order
    const isSortedDescending = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] < array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted in descending order
    expect(isSortedDescending(texts)).toBe(true);
  });

  test('verify ascending order sorting by Jurisdiction column', async () => {
    // Click the Jurisdiction column header to sort in ascending order
    const jurisdictionSortingIcon = loggedInPage.locator("//span[text()='Jurisdiction']");
    await jurisdictionSortingIcon.click();

   
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the Jurisdiction column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(2)',  elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Check if the array is sorted in ascending alphabetical order
    const isSorted = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted in ascending order
    expect(isSorted(texts)).toBe(true);
  });

  test('verify descending order sorting by Jurisdiction column', async () => {
    // Click the Jurisdiction column header twice to sort in descending order
    const jurisdictionSortingIcon = loggedInPage.locator("//span[text()='Jurisdiction']");
    await jurisdictionSortingIcon.click(); // click to sort ascending

    // Wait for the sorting to be completed
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the Jurisdiction column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(2)',  elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Check if the array is sorted in descending alphabetical order
    const isSortedDescending = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] < array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted in descending order
    expect(isSortedDescending(texts)).toBe(true);
  });

  test('verify ascending order sorting by Sent By column', async () => {
    // Click the Sent By column header to sort in ascending order
    const sentBySortingIcon = loggedInPage.locator("//span[text()='Sent By']");
    await sentBySortingIcon.click();

    
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the Sent By column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(3)', elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Check if the array is sorted in ascending alphabetical order
    const isSorted = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted in ascending order
    expect(isSorted(texts)).toBe(true);
  });

  test('verify descending order sorting by Sent By column', async () => {
    // Click the Sent By column header twice to sort in descending order
    const sentBySortingIcon = loggedInPage.locator("//span[text()='Sent By']");
    await sentBySortingIcon.click(); // First click to sort ascending

    await loggedInPage.waitForTimeout(1000);

    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(3)', elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    const isSortedDescending = (array: string[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] < array[i]) {
          return false;
        }
      }
      return true;
    };

    // Assert that the texts are sorted in descending order
    expect(isSortedDescending(texts)).toBe(true);
  });


  test('verify ascending order sorting by Submitted column', async () => {
    // Click the Submitted column header to sort in ascending order
    const submittedSortingIcon = loggedInPage.locator("//span[text()='Submitted']");
    await submittedSortingIcon.click();

    // Wait for the sorting to be completed
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the Submitted column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(5)', elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Parse the dates
    const dates = texts.map(text => new Date(text));

    // Check if the array is sorted in ascending order
    const isSorted = (array: Date[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1].getTime() > array[i].getTime()) {
          return false;
        }
      }
      return true;
    };

    // Assert that the dates are sorted in ascending order
    expect(isSorted(dates)).toBe(true);
  });

  test('verify descending order sorting by Submitted column', async () => {
    // Click the Submitted column header twice to sort in descending order
    const submittedSortingIcon = loggedInPage.locator("//span[text()='Submitted']");
    await submittedSortingIcon.click(); 
  

    // Wait for the sorting to be completed
    await loggedInPage.waitForTimeout(1000);

    // Get the text content of the first 10 rows in the Submitted column
    const texts = await loggedInPage.$$eval('tbody tr td:nth-child(5)', elements =>
        elements.slice(0, 10).map(element => element.textContent?.trim() || '')
    );

    // Parse the dates
    const dates = texts.map(text => new Date(text));

    // Check if the array is sorted in descending order
    const isSortedDescending = (array: Date[]): boolean => {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1].getTime() < array[i].getTime()) {
          return false;
        }
      }
      return true;
    };

    // Assert that the dates are sorted in descending order
    expect(isSortedDescending(dates)).toBe(true);
  });

});

test.describe('Track Submissions Page Pagination Tests', () => {
  let loggedInPage: Page;

  test.beforeAll(async ({ page }) => {
    // Log in and navigate to the track submissions page once before all tests
    loggedInPage = page;
    await login(loggedInPage);
    await loggedInPage.goto('https://dexdev.cdc.gov/home/submissions?data_stream_id=aims-celr&data_route=All&timeframe=Last+30+Days');
    // Verify that the 'Track Submissions' header is visible
    const trackSubmissionsHeader = loggedInPage.locator('//h1[text()="Track Submissions"]');
    await expect(trackSubmissionsHeader).toBeVisible();
  });

  test('verify pagination functionality', async () => {
    // Locate the "Showing" text
    const showingTextLocator = loggedInPage.locator('.text-base.font-sans-sm');
    const totalItemsText = await showingTextLocator.textContent();
    const totalItemsMatch = totalItemsText?.match(/Showing \d+ items of (\d+)/);
    const totalItems = totalItemsMatch ? parseInt(totalItemsMatch[1]) : 0;

    // Calculate the total number of pages
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Loop through each page and verify the number of items
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const tableRows = await loggedInPage.locator('tbody tr');
      const rowCount = await tableRows.count();

      // Verify the number of items on the current page
      if (currentPage < totalPages) {
        expect(rowCount).toBe(itemsPerPage);
      } else {
        // Last page might have less than 10 items
        expect(rowCount).toBeLessThanOrEqual(itemsPerPage);
      }

      // Click on the next page button if it's not the last page
      if (currentPage < totalPages) {
        const nextButton = loggedInPage.locator('button[aria-label="Next page"]');
        await nextButton.waitFor({ state: 'visible' });
        await nextButton.click();
        await loggedInPage.waitForTimeout(2000); // Wait for the next page to load
      }
    }
  });

  test('verify backward pagination functionality', async () => {
    // Navigate to the last page first
    const showingTextLocator = loggedInPage.locator('.text-base.font-sans-sm');
    const totalItemsText = await showingTextLocator.textContent();
    const totalItemsMatch = totalItemsText?.match(/Showing \d+ items of (\d+)/);
    const totalItems = totalItemsMatch ? parseInt(totalItemsMatch[1]) : 0;

    // Calculate the total number of pages
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Loop through each page forward
    for (let currentPage = 1; currentPage < totalPages; currentPage++) {
      const nextButton = loggedInPage.locator('button[aria-label="Next page"]');
      await nextButton.waitFor({ state: 'visible' });
      await nextButton.click();
      await loggedInPage.waitForTimeout(1000); // Wait for the next page to load
    }

    // Now navigate backward through each page
    for (let currentPage = totalPages; currentPage > 1; currentPage--) {
      const previousButton = loggedInPage.locator('button[aria-label="Previous page"]');
      await previousButton.waitFor({ state: 'visible' });
      await previousButton.click();
      await loggedInPage.waitForTimeout(3000); // Wait for the previous page to load

      const tableRows = await loggedInPage.locator('tbody tr');
      const rowCount = await tableRows.count();

      // Verify the number of items on the current page
      expect(rowCount).toBe(itemsPerPage);
    }
  });
});


test.describe('Verify Dropdown on Track Submissions Page', () => {
  let loggedInPage: Page;

  test.beforeAll(async ({ page }) => {
    // Log in and navigate to the track submissions page once before all tests
    loggedInPage = page;
    await login(loggedInPage);
    await loggedInPage.goto('https://dexdev.cdc.gov/home/submissions?data_stream_id=aims-celr&data_route=All&timeframe=Last+30+Days');
    // Verify that the 'Track Submissions' header is visible
    const trackSubmissionsHeader = loggedInPage.locator('//h1[text()="Track Submissions"]');
    await expect(trackSubmissionsHeader).toBeVisible();
  });

  test('verify dropdown headers are visible', async () => {
    // Verify Data Stream header is visible
    const dataStreamHeader = loggedInPage.locator('label[data-testid="test-id-label-data-stream-filter"]');
    await expect(dataStreamHeader).toBeVisible();

    // Verify Data Route header is visible
    const dataRouteHeader = loggedInPage.locator('label[data-testid="test-id-label-data-route-filter"]');
    await expect(dataRouteHeader).toBeVisible();

    // Verify Timeframe header is visible
    const timeframeHeader = loggedInPage.locator('label[data-testid="test-id-label-timeframe-filter"]');
    await expect(timeframeHeader).toBeVisible();

    // Verify Jurisdiction header is visible
    const jurisdictionHeader = loggedInPage.locator('label[data-testid="test-id-label-jurisdiction-filter"]');
    await expect(jurisdictionHeader).toBeVisible();

    // Verify Sender header is visible
    const senderHeader = loggedInPage.locator('label[data-testid="test-id-label-sender-id-filter"]');
    await expect(senderHeader).toBeVisible();
  });

  test('verify timeframe dropdown values', async () => {
    // Locate the Timeframe dropdown
    const timeframeDropdown = loggedInPage.locator('select[data-testid="test-id-select-timeframe-filter"]');
    
    // Fetch all options within the dropdown
    const options = await timeframeDropdown.locator('option').allTextContents();

    // Clean and trim whitespace, handle special characters
    const cleanedOptions = options.map(option => option.replace(/\s+/g, ' ').trim().replace('- Select -', 'Select'));

    // Define the expected options
    const expectedOptions = [
      'Select',
      'Last 30 Days',
      'Last 15 Days',
      'Last 7 Days',
      'Last Day'
    ];

    // Verify that the options match the expected options
    expect(cleanedOptions).toEqual(expectedOptions);
  });

});