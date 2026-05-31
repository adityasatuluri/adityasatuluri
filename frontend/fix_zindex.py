import re
import glob

files = glob.glob('d:/STUDY/PROJECTS/adityasatuluri/frontend/src/**/*.jsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the fixed inset-0 z-50 or similar for the modal wrappers
    # "fixed inset-0 z-50
    content = re.sub(
        r'fixed inset-0 z-50 ',
        r'fixed inset-0 z-[1000] ',
        content
    )
    
    # Check for z-[200] in App.jsx (resume modal)
    content = re.sub(
        r'fixed inset-0 z-\[200\] ',
        r'fixed inset-0 z-[1000] ',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
