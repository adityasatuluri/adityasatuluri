import re

filepath = 'd:/STUDY/PROJECTS/adityasatuluri/frontend/src/App.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Desktop header
content = content.replace(
    'sticky top-0 z-50 bg-[#000000]',
    'sticky top-0 z-[950] bg-[#000000]'
)

# Mobile header
content = content.replace(
    'sticky top-0 z-[100] bg-[#000000]',
    'sticky top-0 z-[950] bg-[#000000]'
)

# Mobile fullscreen menu
content = content.replace(
    'fixed inset-0 z-[100] h-[100vh]',
    'fixed inset-0 z-[960] h-[100vh]'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing z-indexes in App.jsx")
