import time
import selenium
from selenium import webdriver
from selenium.webdriver.support.ui import Select

browser = webdriver.Firefox()
browser.get("http://localhost:8000/index.html")

#let's select the house
house = Select(browser.find_element_by_id("houseName"))
house.select_by_visible_text("forest")

#click on the days
time.sleep(5)
days = browser.find_elements_by_class_name("fc-widget-content")
i = 0
for day in days:
    day.click()
    i += 1
    print str(i) + "/" + str(len(days)) + " done"
