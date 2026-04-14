import re

with open('1.4.html', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = re.compile(r'<div class=\"carousel-track\".*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)

replacement = '''<div class="carousel-track" id="carouselTrack" style="transform: translateX(0%);">
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="Bon Bon" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://login.skillizee.io/s/articles/68ba87d4a1b2f72527097c17/images/BonBon_Box_Side-1.png" />
                <p class="text-lg font-bold">Bon Bon</p>
                <p class="text-lg mt-2">A royal blend of Double Chocolate.</p>
              </div>
            </div>
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="Hocco Healthies" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://login.skillizee.io/s/articles/68ba87d4a1b2f72527097c17/images/Hoccco_Healthies_Mock.png" />
                <p class="text-lg font-bold">Hocco Healthies</p>
                <p class="text-lg mt-2">Creamy Healthy Delight.</p>
              </div>
            </div>
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="Chillo Cone" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://hocco-creativity.vercel.app/HoccoBrand/images/Hocco_RegularChillo_Variants.jpg" />
                <p class="text-lg font-bold">Chillo Cone</p>
                <p class="text-lg mt-2">Wide variety of flavors in Chillo Cone.</p>
              </div>
            </div>
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="Boss Bar" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://hocco-creativity.vercel.app/HoccoBrand/images/Hocco_BossBar_Range.jpg" />
                <p class="text-lg font-bold">Boss Bar</p>
                <p class="text-lg mt-2">Premium chocolate bar indulgence.</p>
              </div>
            </div>
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="Charcoal Lychee" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://hocco-creativity.vercel.app/HoccoBrand/images/Hocco_Premium_Tub.png" />
                <p class="text-lg font-bold">Charcoal Lychee</p>
                <p class="text-lg mt-2">The dark side of deliciousness.</p>
              </div>
            </div>
            <div class="carousel-slide">
              <div class="w-full max-w-[380px] mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" alt="BIX" class="w-[280px] h-[280px] object-contain rounded mb-4 mx-auto scoop-bounce" src="https://hocco-creativity.vercel.app/HoccoBrand/images/Hocco_Bix_range.jpg" />
                <p class="text-lg font-bold">BIX</p>
                <p class="text-lg mt-2">Refreshing mixed berry sundae.</p>
              </div>
            </div>
          </div>'''

# extract string to replace
start_idx = text.find('<div class=\"carousel-track\" id=\"carouselTrack\"')
end_idx = text.find('</div>\n          </div>\n          <button')
if start_idx != -1 and end_idx != -1:
    new_text = text[:start_idx] + replacement + text[end_idx+6:]
    with open('1.4.html', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Successfully found and replaced')
else:
    print('Could not find start or end index', start_idx, end_idx)
