import {test, expect, Browser,Page } from '@playwright/test'
import {webkit, chromium, firefox } from 'playwright'
import { getEnv } from "tests/utility/utils";

test('login test', async()=>{
const browser:Browser = await chromium.launch ({headless:false});
const page:Page =await browser.newPage();
await page.goto(getEnv("DEX_URL"));
await page.click('[aria-label="Login with SAMS"]');

// verify choose a login option page
await page.waitForSelector('h1#choose-login-visible-three-four', { state: 'visible' });
const loginHeader = page.locator('h1#choose-login-visible-three-four');
await expect(loginHeader).toHaveText('Choose a login option');
await expect(loginHeader).toBeVisible();


//enter username and password
const samsUserName = page.getByRole('group', { name: 'SAMS Credentials' }).locator('#USER')
const samsPword = page.getByRole('group', { name: 'SAMS Credentials' }).locator('#PASSWORD');
//const agreeTermService =page.locator('#sams-agree-checkbox-visible-one');
const loginBtn = page.getByRole('group', { name: 'SAMS Credentials' }).getByRole('button');


await samsUserName.fill(getEnv("SAMS_USERNAME"));
await samsPword.fill(getEnv("SAMS_PASSWORD"));
//await agreeTermService.check();
await loginBtn.click();

await page.waitForTimeout(2000);

await expect(page).toHaveURL(new RegExp('^https://dexdev.cdc.gov/home/dashboard'));
await expect (page).toHaveTitle('DEX');

})

