import React, { useState, useEffect, useRef } from 'react';
import { Book, Code, Play, Settings, ChevronRight, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const DocumentationPage = () => {
  const { isDark, classes, getThemedGradient } = useTheme();
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const sectionsRef = useRef({});

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id);
            if (!location.hash.includes(id)) {
              navigate(`/documentation#${id}`, { replace: true });
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate, location.hash]);

  // Handle initial hash navigation and browser back/forward
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && sectionsRef.current[hash]) {
      scrollToSection(hash, false);
      setActiveSection(hash);
    }
  }, [location.hash]);

  const scrollToSection = (sectionId, updateHash = true) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (updateHash) {
        navigate(`/documentation#${sectionId}`, { replace: true });
      }
      // Expand the section if it's collapsed
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: true
      }));
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const algorithms = {
    sorting: [
      { name: 'Bubble Sort', complexity: 'O(n²)', description: 'Simple comparison-based sorting algorithm' },
      { name: 'Quick Sort', complexity: 'O(n log n)', description: 'Efficient divide-and-conquer sorting' },
      { name: 'Merge Sort', complexity: 'O(n log n)', description: 'Stable divide-and-conquer sorting' },
      { name: 'Heap Sort', complexity: 'O(n log n)', description: 'In-place comparison-based sorting' },
    ],
    graph: [
      { name: 'BFS', complexity: 'O(V + E)', description: 'Breadth-first graph traversal' },
      { name: 'DFS', complexity: 'O(V + E)', description: 'Depth-first graph traversal' },
      { name: "Dijkstra's", complexity: 'O(V²)', description: 'Shortest path algorithm' },
      { name: "Kruskal's MST", complexity: 'O(E log E)', description: 'Minimum spanning tree' },
    ]
  };

  const codeExamples = {
    bubbleSort: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    bfs: `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`
  };

  // Close mobile menu when section is clicked
  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className={`text-center mb-12 p-8 rounded-2xl backdrop-blur-xl ${
          isDark 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
        } border`}>
          <h1 className={`text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Documentation
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Complete guide to using Algorithm Visualizer Pro, understanding algorithms, and implementation examples.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Fixed position on desktop */}
          <div className={`lg:col-span-1 p-6 rounded-2xl backdrop-blur-xl lg:sticky lg:top-20 h-fit ${
            isDark 
              ? 'bg-gray-800/20 border-gray-700/50' 
              : 'bg-white/20 border-white/50'
          } border h-fit sticky top-24`}>
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Table of Contents
            </h3>
            <nav>
              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden w-full text-left px-4 py-2 mb-4 rounded-lg transition-all ${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                } flex items-center justify-between`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="flex items-center gap-2">
                  <Book size={18} /> Navigation
                </span>
                {mobileMenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              <div className={`space-y-2 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                <button
                  onClick={() => handleSectionClick('getting-started')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isDark 
                      ? activeSection === 'getting-started'
                        ? 'bg-gray-700/50'
                        : 'hover:bg-gray-700/50'
                      : activeSection === 'getting-started'
                        ? 'bg-gray-100/50'
                        : 'hover:bg-gray-100/50'
                  } flex items-center gap-2`}
                >
                  <Book size={18} /> Getting Started
                </button>
                <button
                  onClick={() => handleSectionClick('algorithms')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isDark 
                      ? activeSection === 'algorithms'
                        ? 'bg-gray-700/50'
                        : 'hover:bg-gray-700/50'
                      : activeSection === 'algorithms'
                        ? 'bg-gray-100/50'
                        : 'hover:bg-gray-100/50'
                  } flex items-center gap-2`}
                >
                  <Code size={18} /> Algorithms
                </button>
                <button
                  onClick={() => handleSectionClick('api-reference')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isDark 
                      ? activeSection === 'api-reference'
                        ? 'bg-gray-700/50'
                        : 'hover:bg-gray-700/50'
                      : activeSection === 'api-reference'
                        ? 'bg-gray-100/50'
                        : 'hover:bg-gray-100/50'
                  } flex items-center gap-2`}
                >
                  <Settings size={18} /> API Reference
                </button>
                <button
                  onClick={() => handleSectionClick('examples')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isDark 
                      ? activeSection === 'examples'
                        ? 'bg-gray-700/50'
                        : 'hover:bg-gray-700/50'
                      : activeSection === 'examples'
                        ? 'bg-gray-100/50'
                        : 'hover:bg-gray-100/50'
                  } flex items-center gap-2`}
                >
                  <Play size={18} /> Examples
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started Section */}
            <section 
              ref={el => sectionsRef.current['getting-started'] = el}
              className={`p-8 rounded-2xl backdrop-blur-xl ${
                isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/20 border-white/50'
              } border`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Getting Started
              </h2>
              <div className="prose max-w-none">
                {/* Add your getting started content here */}
              </div>
            </section>

            {/* Algorithms Section */}
            <section 
              ref={el => sectionsRef.current['algorithms'] = el}
              className={`p-8 rounded-2xl backdrop-blur-xl ${
                isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/20 border-white/50'
              } border`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Algorithms
              </h2>
              {/* Add your algorithms content here */}
            </section>

            {/* API Reference Section */}
            <section 
              ref={el => sectionsRef.current['api-reference'] = el}
              className={`p-8 rounded-2xl backdrop-blur-xl ${
                isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/20 border-white/50'
              } border`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                API Reference
              </h2>
              {/* Add your API reference content here */}
            </section>

            {/* Examples Section */}
            <section 
              ref={el => sectionsRef.current['examples'] = el}
              className={`p-8 rounded-2xl backdrop-blur-xl ${
                isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/20 border-white/50'
              } border`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Examples
              </h2>
              {/* Add your examples content here */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
