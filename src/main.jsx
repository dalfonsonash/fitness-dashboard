import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dumbbell, Utensils, LineChart, Home, Plus, Trash2, AlertTriangle } from "lucide-react";
import "./styles.css";

const WORKOUTS = [
  {
    day: "Monday",
    title: "Upper Push Sculpt",
    endurance: "Later: 18-mile ride",
    exercises: [
      ["Neutral-Grip Dumbbell Bench Press", 4, "8–12", "Keep wrist neutral. Stop before wrist pain.", true],
      ["Incline Dumbbell Press", 4, "10", "Upper chest priority. Neutral wrist.", true],
      ["Cable Flyes", 3, "15", "Controlled stretch, light/moderate load.", true],
      ["Seated Dumbbell Shoulder Press", 3, "10", "Use neutral grip if needed.", true],
      ["Lateral Raises", 4, "15", "Lead with elbows; do not swing.", false],
      ["Rear Delt Flyes", 4, "15", "Posture and shoulder shape.", false],
      ["Rope Pushdowns", 3, "12", "Wrist-friendly triceps work.", true],
      ["Overhead Rope Extensions", 3, "12", "Use cables; avoid sharp pain.", true],
      ["Hanging Leg Raises", 3, "12", "Core control.", false],
      ["Plank", 3, "60 sec", "Brace abs and glutes.", false]
    ]
  },
  {
    day: "Tuesday",
    title: "Lower Body + Core",
    endurance: "Later: 6-mile run",
    exercises: [
      ["Goblet Squat", 3, "10", "Moderate load. Save legs for running.", false],
      ["Romanian Deadlift", 3, "10", "Hip hinge, hamstrings, glutes.", false],
      ["Walking Lunges", 2, "20 steps", "Controlled, not maximal.", false],
      ["Hamstring Curl", 3, "12", "Machine preferred.", false],
      ["Standing Calf Raise", 4, "15", "Full stretch and squeeze.", false],
      ["Ab Wheel", 3, "10", "Brace core; stop before low-back sag.", false],
      ["Reverse Crunch", 3, "15", "Controlled hips.", false]
    ]
  },
  {
    day: "Wednesday",
    title: "Upper Pull Sculpt",
    endurance: "Later: 28-mile ride",
    exercises: [
      ["Pull-Ups or Assisted Pull-Ups", 4, "6–10", "Use neutral handles if available.", true],
      ["Neutral-Grip Lat Pulldown", 3, "10", "V-taper builder.", true],
      ["Seated Cable Row", 3, "12", "Neutral grip preferred.", true],
      ["Single-Arm Dumbbell Row", 3, "10", "Brace on bench with wrist comfort.", false],
      ["Face Pulls", 4, "15", "Rear delts and posture.", true],
      ["Dumbbell Curl", 3, "12", "Use comfortable grip.", false],
      ["Hammer Curl", 3, "10", "More wrist-friendly.", true],
      ["Incline Curl", 3, "12", "Light/moderate, no wrist torque.", false],
      ["Cable Crunch", 3, "15", "Controlled flexion.", false],
      ["Side Plank", 3, "30 sec", "Each side.", false]
    ]
  },
  {
    day: "Friday",
    title: "Upper Body Specialization",
    endurance: "Later: 40-mile ride",
    exercises: [
      ["Incline Dumbbell Press", 4, "10", "Upper chest. No heavy maxing.", true],
      ["Cable Flyes", 3, "15", "Constant tension.", true],
      ["Lateral Raises", 5, "15", "Shoulder width priority.", false],
      ["Rear Delt Flyes", 4, "15", "Posture and rear delts.", false],
      ["Rope Pushdowns", 4, "12", "Elbows still; wrist neutral.", true],
      ["Hammer Curl", 4, "12", "Wrist-friendly arm work.", true],
      ["Farmer Carries", 5, "60 sec", "Use straps if wrist limits grip.", false],
      ["Push-Ups on Handles", 3, "Near failure", "Handles protect wrist extension.", true]
    ]
  }
].map(w => ({...w, exercises: w.exercises.map((e, i) => ({
  id: `${w.day}-${i}`, name: e[0], sets: e[1], reps: e[2], notes: e[3], wrist: e[4]
}))}));

const DEFAULT_TARGETS = { calories: 2400, protein: 185, carbs: 225, fat: 70 };

const FOOD_LIBRARY = [
  {
    name: "Eggs",
    servings: [
      { label: "1 large egg", calories: 72, protein: 6, carbs: 0, fat: 5 },
      { label: "2 large eggs", calories: 144, protein: 13, carbs: 1, fat: 10 },
      { label: "3 large eggs", calories: 216, protein: 19, carbs: 1, fat: 15 }
    ]
  },
  {
    name: "Oatmeal",
    servings: [
      { label: "1/2 cup dry oats", calories: 150, protein: 5, carbs: 27, fat: 3 },
      { label: "1 cup cooked", calories: 154, protein: 6, carbs: 28, fat: 3 }
    ]
  },
  {
    name: "Greek Yogurt",
    servings: [
      { label: "170g nonfat", calories: 100, protein: 17, carbs: 6, fat: 0 },
      { label: "1 cup nonfat", calories: 130, protein: 23, carbs: 9, fat: 0 }
    ]
  },
  {
    name: "Whey Protein",
    servings: [
      { label: "1 scoop", calories: 120, protein: 24, carbs: 3, fat: 2 },
      { label: "2 scoops", calories: 240, protein: 48, carbs: 6, fat: 4 }
    ]
  },
  {
    name: "Chicken Breast",
    servings: [
      { label: "4 oz cooked", calories: 187, protein: 35, carbs: 0, fat: 4 },
      { label: "6 oz cooked", calories: 281, protein: 53, carbs: 0, fat: 6 }
    ]
  },
  {
    name: "Rice",
    servings: [
      { label: "1/2 cup cooked white rice", calories: 103, protein: 2, carbs: 23, fat: 0 },
      { label: "1 cup cooked white rice", calories: 205, protein: 4, carbs: 45, fat: 0 }
    ]
  },
  {
    name: "Banana",
    servings: [
      { label: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
      { label: "1 large", calories: 121, protein: 1, carbs: 31, fat: 0 }
    ]
  },
  {
    name: "Salmon",
    servings: [
      { label: "4 oz cooked", calories: 233, protein: 25, carbs: 0, fat: 14 },
      { label: "6 oz cooked", calories: 350, protein: 38, carbs: 0, fat: 21 }
    ]
  },
  {
    name: "Turkey Sandwich",
    servings: [
      { label: "1 sandwich", calories: 320, protein: 28, carbs: 36, fat: 8 },
      { label: "1/2 sandwich", calories: 160, protein: 14, carbs: 18, fat: 4 }
    ]
  },
  {
    name: "Avocado",
    servings: [
      { label: "1/2 medium", calories: 120, protein: 2, carbs: 6, fat: 11 },
      { label: "1 medium", calories: 240, protein: 3, carbs: 12, fat: 22 }
    ]
  },
  {
    name: "Cottage Cheese",
    servings: [
      { label: "1/2 cup low-fat", calories: 90, protein: 13, carbs: 5, fat: 2 },
      { label: "1 cup low-fat", calories: 180, protein: 26, carbs: 10, fat: 4 }
    ]
  },
  {
    name: "Mixed Salad",
    servings: [
      { label: "2 cups vegetables", calories: 35, protein: 2, carbs: 7, fat: 0 },
      { label: "2 cups with vinaigrette", calories: 155, protein: 2, carbs: 9, fat: 12 }
    ]
  }
];

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function todayKey() {
  return new Date().toISOString().slice(0,10);
}

function weekdayName() {
  return new Date().toLocaleDateString(undefined, { weekday: "long" });
}

function getTodayWorkout() {
  const day = weekdayName();
  return WORKOUTS.find(w => w.day === day);
}

function mealRecommendations(remaining) {
  const items = [];
  if (remaining.protein >= 40 && remaining.carbs >= 40) {
    items.push("Chicken rice bowl: grilled chicken, rice, vegetables, salsa.");
    items.push("Greek yogurt bowl: nonfat Greek yogurt, berries, oats, whey protein.");
  }
  if (remaining.protein >= 30 && remaining.fat <= 25) {
    items.push("Lean turkey wrap: turkey breast, high-fiber tortilla, vegetables.");
    items.push("Egg-white scramble: egg whites, spinach, mushrooms, fruit.");
  }
  if (remaining.carbs >= 60) {
    items.push("Endurance refill: oatmeal, banana, whey protein, cinnamon.");
    items.push("Post-ride meal: lean protein, potatoes, vegetables.");
  }
  if (remaining.calories < 500 && remaining.protein >= 25) {
    items.push("Protein shake plus berries.");
    items.push("Cottage cheese with fruit.");
  }
  if (!items.length) {
    items.push("Keep it simple: lean protein plus vegetables.");
    items.push("If calories are nearly used, choose protein-first foods.");
  }
  return items;
}

function App() {
  const [tab, setTab] = useState("dashboard");
  const [logs, setLogs] = useState(() => load("workoutLogs", []));
  const [foods, setFoods] = useState(() => load("foods", []));
  const [targets, setTargets] = useState(() => load("macroTargets", DEFAULT_TARGETS));
  const [progress, setProgress] = useState(() => load("progressEntries", []));

  const setAndSaveLogs = (v) => { setLogs(v); save("workoutLogs", v); };
  const setAndSaveFoods = (v) => { setFoods(v); save("foods", v); };
  const setAndSaveTargets = (v) => { setTargets(v); save("macroTargets", v); };
  const setAndSaveProgress = (v) => { setProgress(v); save("progressEntries", v); };

  const todayFoods = foods.filter(f => f.date === todayKey());
  const totals = todayFoods.reduce((a, f) => ({
    calories: a.calories + Number(f.calories || 0),
    protein: a.protein + Number(f.protein || 0),
    carbs: a.carbs + Number(f.carbs || 0),
    fat: a.fat + Number(f.fat || 0)
  }), { calories:0, protein:0, carbs:0, fat:0 });
  const remaining = {
    calories: Math.max(0, targets.calories - totals.calories),
    protein: Math.max(0, targets.protein - totals.protein),
    carbs: Math.max(0, targets.carbs - totals.carbs),
    fat: Math.max(0, targets.fat - totals.fat)
  };

  return (
    <div className="app">
      <header>
        <h1>David Fitness Dashboard</h1>
        <p>Master’s Athlete Physique Program</p>
      </header>

      <main>
        {tab === "dashboard" && <Dashboard logs={logs} totals={totals} remaining={remaining} />}
        {tab === "workouts" && <Workouts logs={logs} setLogs={setAndSaveLogs} />}
        {tab === "nutrition" && <Nutrition foods={foods} setFoods={setAndSaveFoods} targets={targets} setTargets={setAndSaveTargets} totals={totals} remaining={remaining} />}
        {tab === "progress" && <Progress progress={progress} setProgress={setAndSaveProgress} logs={logs} />}
      </main>

      <nav>
        <button className={tab==="dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}><Home size={18}/>Dashboard</button>
        <button className={tab==="workouts" ? "active" : ""} onClick={() => setTab("workouts")}><Dumbbell size={18}/>Workouts</button>
        <button className={tab==="nutrition" ? "active" : ""} onClick={() => setTab("nutrition")}><Utensils size={18}/>Nutrition</button>
        <button className={tab==="progress" ? "active" : ""} onClick={() => setTab("progress")}><LineChart size={18}/>Progress</button>
      </nav>
    </div>
  );
}

function Dashboard({ totals, remaining }) {
  const workout = getTodayWorkout();
  return (
    <section className="page">
      <div className="card hero">
        <h2>{weekdayName()}</h2>
        {workout ? (
          <>
            <h3>{workout.title}</h3>
            <p>{workout.endurance}</p>
          </>
        ) : (
          <>
            <h3>Run, Ride, Mobility, or Recovery Day</h3>
            <p>Protect recovery. Your endurance volume is already high.</p>
          </>
        )}
      </div>

      <div className="card warning">
        <AlertTriangle size={20}/>
        <p><b>Wrist rule:</b> neutral grip, wrist brace as needed, no sharp pain, no ego benching.</p>
      </div>

      <MacroGrid title="Remaining Macros Today" data={remaining}/>
      <MacroGrid title="Consumed Today" data={totals}/>
    </section>
  );
}

function MacroGrid({ title, data }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="grid">
        <Metric label="Calories" value={data.calories}/>
        <Metric label="Protein" value={`${data.protein}g`}/>
        <Metric label="Carbs" value={`${data.carbs}g`}/>
        <Metric label="Fat" value={`${data.fat}g`}/>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong></div>
}

function Workouts({ logs, setLogs }) {
  const [selected, setSelected] = useState(WORKOUTS[0]);
  return (
    <section className="page">
      <div className="tabs">
        {WORKOUTS.map(w => <button key={w.day} className={selected.day===w.day ? "active" : ""} onClick={() => setSelected(w)}>{w.day}</button>)}
      </div>

      <div className="card">
        <h2>{selected.title}</h2>
        <p>{selected.endurance}</p>
      </div>

      {selected.exercises.map(ex => <ExerciseCard key={ex.id} workout={selected.title} exercise={ex} logs={logs} setLogs={setLogs}/>)}
    </section>
  );
}

function ExerciseCard({ workout, exercise, logs, setLogs }) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [setNumber, setSetNumber] = useState(1);
  const recent = logs.filter(l => l.exercise === exercise.name).slice(-4).reverse();

  function addLog() {
    if (!weight && !reps) return;
    const entry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      day: todayKey(),
      workout,
      exercise: exercise.name,
      setNumber,
      weight,
      reps
    };
    setLogs([...logs, entry]);
    setWeight("");
    setReps("");
    setSetNumber(Math.min(setNumber + 1, exercise.sets));
  }

  return (
    <div className="card exercise">
      <h3>{exercise.name} {exercise.wrist && <span className="badge">wrist-friendly</span>}</h3>
      <p><b>{exercise.sets} sets × {exercise.reps}</b></p>
      <p className="muted">{exercise.notes}</p>

      <div className="logrow">
        <select value={setNumber} onChange={e => setSetNumber(Number(e.target.value))}>
          {Array.from({length: exercise.sets}, (_, i) => <option key={i+1} value={i+1}>Set {i+1}</option>)}
        </select>
        <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="lbs" inputMode="decimal"/>
        <input value={reps} onChange={e => setReps(e.target.value)} placeholder="reps" inputMode="numeric"/>
        <button onClick={addLog}><Plus size={16}/>Save</button>
      </div>

      {recent.length > 0 && <div className="recent">
        <b>Recent</b>
        {recent.map(r => <small key={r.id}>Set {r.setNumber}: {r.weight} lbs × {r.reps}</small>)}
      </div>}
    </div>
  );
}

function Nutrition({ foods, setFoods, targets, setTargets, totals, remaining }) {
  const [entry, setEntry] = useState({ meal:"Breakfast", food:"", calories:"", protein:"", carbs:"", fat:"" });
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [selectedServingIndex, setSelectedServingIndex] = useState(0);
  const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const todayFoods = foods.filter(f => f.date === todayKey());
  const selectedFood = FOOD_LIBRARY.find(food => food.name === selectedFoodId);

  function addFood() {
    if (!entry.food) return;
    setFoods([...foods, { id: crypto.randomUUID(), date: todayKey(), ...entry }]);
    setEntry({ meal: entry.meal, food:"", calories:"", protein:"", carbs:"", fat:"" });
    setSelectedFoodId("");
    setSelectedServingIndex(0);
  }

  function deleteFood(id) {
    setFoods(foods.filter(f => f.id !== id));
  }

  function fillFromLibrary(foodName, servingIndex = 0) {
    setSelectedFoodId(foodName);
    setSelectedServingIndex(servingIndex);

    const food = FOOD_LIBRARY.find(item => item.name === foodName);
    if (!food) return;

    const serving = food.servings[servingIndex] ?? food.servings[0];
    setEntry({
      ...entry,
      food: `${food.name} (${serving.label})`,
      calories: String(serving.calories),
      protein: String(serving.protein),
      carbs: String(serving.carbs),
      fat: String(serving.fat)
    });
  }

  return (
    <section className="page">
      <MacroGrid title="Consumed Today" data={totals}/>
      <MacroGrid title="Remaining Today" data={remaining}/>

      <div className="card">
        <h3>Daily Macro Targets</h3>
        <div className="logrow wrap">
          {["calories","protein","carbs","fat"].map(k => (
            <label key={k}>{k}
              <input value={targets[k]} onChange={e => setTargets({...targets, [k]: Number(e.target.value || 0)})} inputMode="numeric"/>
            </label>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Add Food</h3>
        <div className="form">
          <select value={entry.meal} onChange={e => setEntry({...entry, meal:e.target.value})}>
            {meals.map(m => <option key={m}>{m}</option>)}
          </select>
          <div className="libraryPicker">
            <label>Food library
              <select value={selectedFoodId} onChange={e => fillFromLibrary(e.target.value, 0)}>
                <option value="">Manual entry</option>
                {FOOD_LIBRARY.map(food => <option key={food.name} value={food.name}>{food.name}</option>)}
              </select>
            </label>
            <label>Serving size
              <select
                value={selectedServingIndex}
                onChange={e => fillFromLibrary(selectedFoodId, Number(e.target.value))}
                disabled={!selectedFood}
              >
                {(selectedFood?.servings ?? [{ label: "Choose food" }]).map((serving, index) => (
                  <option key={serving.label} value={index}>{serving.label}</option>
                ))}
              </select>
            </label>
          </div>
          <input placeholder="Food name" value={entry.food} onChange={e => setEntry({...entry, food:e.target.value})}/>
          <input placeholder="Calories" inputMode="numeric" value={entry.calories} onChange={e => setEntry({...entry, calories:e.target.value})}/>
          <input placeholder="Protein g" inputMode="numeric" value={entry.protein} onChange={e => setEntry({...entry, protein:e.target.value})}/>
          <input placeholder="Carbs g" inputMode="numeric" value={entry.carbs} onChange={e => setEntry({...entry, carbs:e.target.value})}/>
          <input placeholder="Fat g" inputMode="numeric" value={entry.fat} onChange={e => setEntry({...entry, fat:e.target.value})}/>
          <button onClick={addFood}><Plus size={16}/>Add Food</button>
        </div>
      </div>

      <div className="card">
        <h3>Meal Recommendations</h3>
        <ul>
          {mealRecommendations(remaining).map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Today’s Food</h3>
        {meals.map(meal => {
          const mealFoods = todayFoods.filter(f => f.meal === meal);
          if (!mealFoods.length) return null;
          return <div key={meal}>
            <h4>{meal}</h4>
            {mealFoods.map(f => (
              <div className="food" key={f.id}>
                <div>
                  <b>{f.food}</b>
                  <small>{f.calories} cal | P {f.protein}g | C {f.carbs}g | F {f.fat}g</small>
                </div>
                <button className="icon" onClick={() => deleteFood(f.id)}><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        })}
      </div>
    </section>
  );
}

function Progress({ progress, setProgress, logs }) {
  const [entry, setEntry] = useState({ weight:"", waist:"", energy:"", wristPain:"", notes:"" });

  function addProgress() {
    setProgress([...progress, { id: crypto.randomUUID(), date: todayKey(), ...entry }]);
    setEntry({ weight:"", waist:"", energy:"", wristPain:"", notes:"" });
  }

  return (
    <section className="page">
      <div className="card hero">
        <h2>Starting Point</h2>
        <p>5'11", 195 lbs, 37-inch waist</p>
        <p><b>12-week target:</b> 185–190 lbs and 34.5–35.5-inch waist.</p>
      </div>

      <div className="card">
        <h3>Sunday Check-In</h3>
        <div className="form">
          <input placeholder="Weight" value={entry.weight} onChange={e => setEntry({...entry, weight:e.target.value})}/>
          <input placeholder="Waist at navel" value={entry.waist} onChange={e => setEntry({...entry, waist:e.target.value})}/>
          <input placeholder="Energy 1–10" value={entry.energy} onChange={e => setEntry({...entry, energy:e.target.value})}/>
          <input placeholder="Wrist pain 1–10" value={entry.wristPain} onChange={e => setEntry({...entry, wristPain:e.target.value})}/>
          <input placeholder="Notes" value={entry.notes} onChange={e => setEntry({...entry, notes:e.target.value})}/>
          <button onClick={addProgress}><Plus size={16}/>Save Check-In</button>
        </div>
      </div>

      <div className="card">
        <h3>Check-In History</h3>
        {progress.slice().reverse().map(p => (
          <div className="food" key={p.id}>
            <div>
              <b>{p.date}</b>
              <small>Weight {p.weight} | Waist {p.waist} | Energy {p.energy} | Wrist {p.wristPain}</small>
              {p.notes && <small>{p.notes}</small>}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Recent Workout Logs</h3>
        {logs.slice(-20).reverse().map(l => (
          <div className="food" key={l.id}>
            <div>
              <b>{l.exercise}</b>
              <small>{l.day}: Set {l.setNumber}, {l.weight} lbs × {l.reps}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
