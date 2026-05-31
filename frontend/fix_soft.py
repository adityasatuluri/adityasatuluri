import re

with open('d:/STUDY/PROJECTS/adityasatuluri/frontend/src/pages/Soft.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace skills maps
content = re.sub(
    r'<button\s+key=\{s\}\s+className=\{px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button \$\{\s+selectedSkills\.includes\(s\)\s+\?\s+"bg-\[#D90908\] text-black font-bold"\s+:\s+"bg-black text-\[#D90908\] border border-\[#D90908\]/50 hover:border-\[#D90908\]"\s+\}\}\s+onClick=\{[^}]+\}\s+>\s+\{s\}\s+</button>',
    r'''<div
                            key={s}
                            className={p-[1px] cyber-button inline-block transition-all duration-300 }
                          >
                            <button
                              className={lock w-full h-full px-3 py-1 text-sm font-mono cyber-button transition-colors }
                              onClick={() => toggleFilter(s, setSelectedSkills)}
                            >
                              {s}
                            </button>
                          </div>''',
    content
)

# Replace years maps
content = re.sub(
    r'<button\s+key=\{y\}\s+className=\{px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button \$\{\s+selectedYears\.includes\(y\)\s+\?\s+"bg-\[#D90908\] text-black font-bold"\s+:\s+"bg-black text-\[#D90908\] border border-\[#D90908\]/50 hover:border-\[#D90908\]"\s+\}\}\s+onClick=\{[^}]+\}\s+>\s+\{y\}\s+</button>',
    r'''<div
                            key={y}
                            className={p-[1px] cyber-button inline-block transition-all duration-300 }
                          >
                            <button
                              className={lock w-full h-full px-3 py-1 text-sm font-mono cyber-button transition-colors }
                              onClick={() => toggleFilter(y, setSelectedYears)}
                            >
                              {y}
                            </button>
                          </div>''',
    content
)

# Replace project tags
content = re.sub(
    r'<span\s+key=\{index\}\s+className="text-xs bg-black text-\[#D90908\] border border-\[#D90908\]/50 px-2 py-1 font-mono cyber-button"\s+>\s+\{skill\}\s+</span>',
    r'''<div
                          key={index}
                          className="p-[1px] bg-[#D90908]/50 cyber-button inline-block"
                        >
                          <span className="block w-full h-full text-xs bg-black text-[#D90908] px-2 py-1 font-mono cyber-button">
                            {skill}
                          </span>
                        </div>''',
    content
)

with open('d:/STUDY/PROJECTS/adityasatuluri/frontend/src/pages/Soft.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done!")
