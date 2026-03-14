<h2>Intentional Bug</h2>

<h3>Scrolling Event Listener Memory Leak</h3>

<p>
I have added this intentional bug in virtualization logic.
</p>

<pre>
const listRef = useRef(null);

useEffect(() => {
  const list = listRef.current;

  const handleScroll = () => {
    setScrollTop(list.scrollTop);
  };

  if (list) {
    list.addEventListener("scroll", handleScroll);
  }
}, []);
</pre>

<h3>What the Bug Is</h3>

<p>
In this code, a scroll event listener is attached to the list container using
<code>addEventListener</code>, but it is <strong>never removed</strong> when the component unmounts.
</p>

<p>
Because there is no cleanup function inside the <code>useEffect</code>, the event listener may remain
in memory even after the component is removed from the DOM.
</p>

<h3>Why This Is a Problem</h3>

<ul>
<li>Unnecessary memory usage</li>
<li>Multiple scroll handlers will trigger</li>
<li>Will lead to preformance issues</li>
</ul>

<h3>How It can be Fixed</h3>

<pre>
return () => {
  list.removeEventListener("scroll", handleScroll);
};
</pre>

<h3>Why I Chose This Bug</h3>

<p>
I chose this bug because it represents a <strong>real-world issue related to event listeners
and the React component lifecycle</strong>.
</p>

<p>
As mentioned in the assignment focus on <strong>browser behavior and performance</strong>,
since unmanaged event listeners can lead to memory leaks in large applications.
</p>



<h2>Virtualization Logic</h2>

<p>
The employee dataset which we are getting from the API can be large. Rendering the entire dataset in the DOM
would create a large number of DOM nodes and reduce performance.
</p>

<p>
To solve this problem, I implemented <strong>manual list virtualization</strong>.
Instead of rendering the entire list, only the rows that are currently visible inside the
scroll container are rendered.
</p>

<h3>Step 1: Fixed Row Height</h3>

<p>Each row in the list has a fixed height.</p>

<pre>
rowHeight = 50px
</pre>

<h3>Step 2: Tracking Scroll Position</h3>

<p>The scroll position of the container is tracked using the <code>scrollTop</code> value.</p>

<pre>
scrollTop = number of pixels scrolled from the top
</pre>

<h3>Step 3: Calculating the First Visible Row</h3>

<pre>
startIndex = Math.floor(scrollTop / rowHeight)
</pre>

<p>Example:</p>

<pre>
scrollTop = 200px
rowHeight = 50px

200 / 50 = 4
</pre>

<p>So row index <strong>4</strong> becomes the first visible row.</p>

<h3>Step 4: Calculating Visible Rows</h3>

<pre>
containerHeight = 500px
</pre>

<pre>
visibleRows = containerHeight / rowHeight
</pre>

<p>Example:</p>

<pre>
500 / 50 = 10 rows
</pre>

<h3>Step 5: Adding a Small Buffer</h3>

<pre>
buffer = 5 rows
</pre>

<p>So the rendered rows become:</p>

<pre>
startIndex → startIndex + visibleRows + buffer
</pre>

<h3>Step 6: Rendering Only Visible Rows</h3>

<pre>
employees.slice(startIndex, endIndex)
</pre>

<p>
This ensures that only a small number of rows are rendered at a time.
</p>

<h3>Step 7: Maintaining Scroll Height</h3>

<pre>
totalHeight = employees.length * rowHeight
</pre>

<p>
Each row is positioned using absolute positioning based on its index so that it appears in the correct location while scrolling.
</p>

<p>
This approach keeps the number of DOM elements small and improves performance when handling large datasets.
</p>