// Compiled from inline JSX. Keep Babel out of the browser runtime.
const _Fragment = React.Fragment;
const _jsx = (type, props, key) => {
  const config = props == null ? {} : {...props};
  if (key !== undefined) config.key = key;
  return React.createElement(type, config);
};
const _jsxs = _jsx;
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// ── UTILS ──────────────────────────────────────────────────────────────────────
const localDateString = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const getTodayDate = () => localDateString();
const todayObj = new Date();
const currentDay = todayObj.getDay() || 7;
const getDayDate = target => {
  const d = new Date(todayObj);
  d.setDate(todayObj.getDate() - currentDay + target);
  return localDateString(d);
};
const fmtDate = str => {
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short'
  });
};
const DAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const DAY_INDEXES = [1, 2, 3, 4, 5, 6, 0];
const MONTH_RU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const SUBJECTS = ['История', 'Общество', 'Русский', 'Математика', 'Английский', 'Другое'];
const inferSubject = (text = '') => {
  const t = text.toLowerCase();
  if (t.includes('обществ')) return 'Общество';
  if (t.includes('истор')) return 'История';
  if (t.includes('рус')) return 'Русский';
  if (t.includes('мат')) return 'Математика';
  if (t.includes('англ')) return 'Английский';
  return 'История';
};
const subjectColor = subject => ({
  'История': '#446fd4',
  'Общество': '#8f762f',
  'Русский': '#b95757',
  'Математика': '#3f7d5b',
  'Английский': '#6f5ca8',
  'Другое': '#6f7378'
})[subject] || '#777';
const subjectTagText = () => '#fff';

// ── AUTO-COMPLETE ──────────────────────────────────────────────────────────────
const runAutoCompletion = (cls, cst, cg, ctx) => {
  let updated = false;
  const now = new Date();
  let newL = [...cls],
    newS = [...cst],
    newT = [...ctx];
  newL = newL.map(lesson => {
    const end = new Date(`${lesson.date}T${lesson.time}`);
    end.setHours(end.getHours() + 1);
    if (lesson.status === 'planned' && end <= now) {
      updated = true;
      const grp = lesson.type === 'group' ? cg.find(g => g.id === lesson.targetId) : null;
      const lsStudents = lesson.type === 'individual' ? [newS.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => newS.find(s => s.id === id)).filter(Boolean) || [];
      const billableStudents = lsStudents.filter(s => !s.archived);
      const att = {};
      const packageUse = {};
      billableStudents.forEach(s => {
        att[s.id] = true;
        const i = newS.findIndex(st => st.id === s.id);
        if (i === -1) return;
        if ((newS[i].packageLessons || 0) > 0) {
          packageUse[s.id] = true;
          newS[i] = {
            ...newS[i],
            packageLessons: newS[i].packageLessons - 1
          };
        } else {
          const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
          newT.push({
            id: Date.now() + Math.random(),
            studentId: s.id,
            type: 'charge',
            amount: rate,
            date: getTodayDate(),
            comment: `Авто: ${fmtDate(lesson.date)}`,
            lessonId: lesson.id,
            kind: 'attendance'
          });
          newS[i] = {
            ...newS[i],
            balance: newS[i].balance - rate
          };
        }
      });
      return {
        ...lesson,
        status: 'completed',
        attendance: att,
        packageUse
      };
    }
    return lesson;
  });
  return updated ? {
    newLessons: newL,
    newStudents: newS,
    newTransactions: newT
  } : null;
};

// ── MOCK DATA ──────────────────────────────────────────────────────────────────
const mockStudents = [{
  id: 1,
  name: 'Вика',
  rate: 1300,
  phone: '+7 900 001',
  balance: 0
}, {
  id: 2,
  name: 'Алиса',
  rate: 1300,
  phone: '+7 900 002',
  balance: 0
}, {
  id: 3,
  name: 'Султан',
  rate: 1500,
  phone: '+7 900 003',
  balance: 0
}, {
  id: 4,
  name: 'Али',
  rate: 1500,
  phone: '+7 900 004',
  balance: 0
}, {
  id: 5,
  name: 'Андрей',
  rate: 1100,
  phone: '+7 900 005',
  balance: 0
}, {
  id: 6,
  name: 'Илья',
  rate: 1100,
  phone: '+7 900 006',
  balance: 0
}, {
  id: 7,
  name: 'Кирилл',
  rate: 1500,
  phone: '+7 900 007',
  balance: 0
}, {
  id: 8,
  name: 'Ярослав',
  rate: 1500,
  phone: '+7 900 008',
  balance: 0
}, {
  id: 9,
  name: 'Миша',
  rate: 1500,
  phone: '+7 900 009',
  balance: 0
}, {
  id: 10,
  name: 'Полина',
  rate: 1300,
  phone: '+7 900 010',
  balance: 0
}, {
  id: 11,
  name: 'Яна',
  rate: 1300,
  phone: '+7 900 011',
  balance: 0
}, {
  id: 12,
  name: 'Ирина',
  rate: 1100,
  phone: '+7 900 012',
  balance: 0
}, {
  id: 13,
  name: 'София',
  rate: 1000,
  phone: '+7 900 013',
  balance: 0
}, {
  id: 14,
  name: 'Временной',
  rate: 1000,
  phone: '+7 900 014',
  balance: 0
}, {
  id: 15,
  name: 'Марк',
  rate: 1300,
  phone: '+7 900 015',
  balance: 0
}, {
  id: 16,
  name: 'Анатолий',
  rate: 1300,
  phone: '+7 900 016',
  balance: 0
}];
const mockGroups = [{
  id: 1,
  name: 'История 10 (Вика, Алиса)',
  subject: 'История',
  studentIds: [1, 2]
}, {
  id: 2,
  name: 'История 10 (Султан, Али)',
  subject: 'История',
  studentIds: [3, 4]
}, {
  id: 3,
  name: 'Общество 10 (Султан, Андрей, Илья)',
  subject: 'Общество',
  studentIds: [3, 5, 6],
  rateOverrides: {
    3: 1100
  }
}, {
  id: 4,
  name: 'Общество 11 (Кирилл, Ярослав, Миша)',
  subject: 'Общество',
  studentIds: [7, 8, 9]
}, {
  id: 5,
  name: 'Общество 11 (Полина, Яна)',
  subject: 'Общество',
  studentIds: [10, 11]
}, {
  id: 6,
  name: 'История 10 (Андрей, Ирина, Илья)',
  subject: 'История',
  studentIds: [5, 12, 6]
}, {
  id: 7,
  name: 'Общество 9 (София, Временной)',
  subject: 'Общество',
  studentIds: [13, 14]
}, {
  id: 8,
  name: 'Общество 10 (Марк, Анатолий, Ирина)',
  subject: 'Общество',
  studentIds: [15, 16, 12]
}, {
  id: 9,
  name: 'История (Полина, Ярослав, Кирилл)',
  subject: 'История',
  studentIds: [10, 8, 7],
  rateOverrides: {
    10: 600,
    8: 1300,
    7: 1300
  }
}];
const mockLessons = [];
let lId = 1;
for (let w = 0; w < 12; w++) {
  const off = w * 7;
  [[1 + off, 4 + off], [2 + off, 5 + off], [3 + off, 6 + off]].forEach(([a, b], i) => {
    const configs = [[1, '15:00'], [2, '18:00'], [3, '16:30'], [4, '18:00'], [5, '15:00'], [6, '16:30'], [7, '16:30'], [8, '15:00'], [9, '18:00']];
    [[a, b]].flat().forEach(day => {
      const date = getDayDate(day);
      const isPast = date < getTodayDate();
      configs.slice(i * 3, i * 3 + 3).forEach(([tid, time]) => {
        const group = mockGroups.find(g => g.id === tid);
        mockLessons.push({
          id: lId++,
          type: 'group',
          targetId: tid,
          subject: group?.subject || inferSubject(group?.name),
          date,
          time,
          status: isPast ? 'completed' : 'planned'
        });
      });
    });
  });
}
const STORAGE_KEY = 'tutor-app-state-v2';
const STORAGE_VERSION = 3;
const LESSON_STATUS = {
  planned: {
    label: 'План',
    short: 'ПЛАН',
    color: 'var(--blue)'
  },
  completed: {
    label: 'Проведен',
    short: '✓',
    color: 'var(--green)'
  },
  cancelled_by_student: {
    label: 'Отменил ученик',
    short: 'УЧ',
    color: '#a46a2b'
  },
  cancelled_by_tutor: {
    label: 'Отменил репетитор',
    short: 'РЕП',
    color: 'var(--text-sec)'
  },
  rescheduled: {
    label: 'Перенесен',
    short: 'ПЕР',
    color: '#6f5ca8'
  },
  no_show: {
    label: 'Неявка',
    short: 'НЯ',
    color: 'var(--red)'
  }
};
const FINAL_STATUSES = ['completed', 'cancelled_by_student', 'cancelled_by_tutor', 'rescheduled', 'no_show'];
const isFinalLesson = lesson => FINAL_STATUSES.includes(lesson?.status);
const money = n => `${Number(n || 0).toLocaleString('ru-RU')} ₽`;
const cloneDemoState = () => ({
  students: mockStudents.map(s => ({
    ...s,
    subjects: ['История', 'Общество'],
    archived: false,
    packageLessons: 0,
    goal: '',
    notes: '',
    availabilityNotes: '',
    lessonRates: {},
    tgId: ''
  })),
  groups: mockGroups.map(g => ({
    ...g,
    subject: g.subject || 'История',
    studentIds: [...g.studentIds],
    rateOverrides: {
      ...(g.rateOverrides || {})
    },
    archived: false
  })),
  lessons: mockLessons.map(l => ({
    ...l,
    subject: l.subject || 'История',
    topic: '',
    homework: '',
    lessonNote: '',
    duration: 60,
    packageUse: {}
  })),
  txs: [],
  settings: {
    theme: 'light'
  }
});
const cloneEmptyState = () => ({
  students: [],
  groups: [],
  lessons: [],
  txs: [],
  settings: {
    theme: 'light'
  }
});
const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const data = parsed.data || {};
    const groups = (data.groups || []).map(g => {
      const inferred = inferSubject(g.name);
      const subject = inferred !== 'История' ? inferred : g.subject || inferred;
      return {
        archived: false,
        subject,
        rateOverrides: {},
        ...g,
        subject
      };
    });
    const lessons = (data.lessons || []).map(l => {
      const group = l.type === 'group' ? groups.find(g => g.id === l.targetId) : null;
      const lessonSubject = group?.subject || l.subject || inferSubject(group?.name);
      return {
        subject: lessonSubject,
        topic: '',
        homework: '',
        lessonNote: '',
        packageUse: {},
        duration: 60,
        ...l,
        subject: lessonSubject
      };
    });
    const students = (data.students || []).map(s => {
      const groupSubjects = groups.filter(g => g.studentIds?.includes(s.id)).map(g => g.subject);
      const storedSubjects = s.subjects || (s.subject ? [s.subject] : []);
      const subjects = [...new Set([...storedSubjects, ...groupSubjects])];
      return {
        archived: false,
        packageLessons: 0,
        goal: '',
        notes: '',
        availabilityNotes: '',
        lessonRates: {},
        tgId: '',
        ...s,
        subjects: subjects.length ? subjects : ['История']
      };
    });
    return {
      students,
      groups,
      lessons,
      txs: data.txs || [],
      settings: {
        theme: 'light',
        ...(data.settings || {})
      }
    };
  } catch (e) {
    console.warn('Не удалось загрузить сохранение', e);
    return null;
  }
};
const saveState = data => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: STORAGE_VERSION,
    savedAt: new Date().toISOString(),
    data
  }));
};
const txDelta = tx => tx.kind === 'package' ? 0 : tx.type === 'payment' ? Number(tx.amount || 0) : -Number(tx.amount || 0);
const getLessonSubject = (lesson, groups) => {
  if (lesson.subject) return lesson.subject;
  if (lesson.type === 'group') return groups.find(g => g.id === lesson.targetId)?.subject || 'История';
  return 'История';
};
const getLessonStudents = (lesson, students, groups, opts = {}) => {
  const group = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
  const list = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : group?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
  return opts.includeArchived ? list : list.filter(s => !s.archived);
};
const getLessonRate = (lesson, student, groups) => {
  const group = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
  const groupOverride = group?.rateOverrides?.[student.id];
  if (groupOverride !== undefined) return groupOverride;
  // Subject-specific rate on student
  const subjectRate = student.lessonRates?.[lesson.subject];
  if (subjectRate !== undefined) return subjectRate;
  return student.rate;
};
const getStudentLastHomework = (studentId, lessons, groups) => lessons.filter(l => l.homework && (l.type === 'individual' ? l.targetId === studentId : groups.find(g => g.id === l.targetId)?.studentIds.includes(studentId))).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))[0]?.homework || '';
const getStudentLessons = (studentId, lessons, groups) => lessons.filter(l => l.type === 'individual' ? l.targetId === studentId : groups.find(g => g.id === l.targetId)?.studentIds.includes(studentId));
const timeToMin = time => {
  const [h, m] = String(time || '00:00').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};
const minToTime = min => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
const lessonRange = lesson => {
  const start = timeToMin(lesson.time);
  return {
    start,
    end: start + Number(lesson.duration || 60)
  };
};
const rangesOverlap = (a, b) => a.start < b.end && b.start < a.end;
const lessonParticipantIds = (lesson, students, groups) => getLessonStudents(lesson, students, groups, {
  includeArchived: true
}).map(s => s.id);
const findLessonConflicts = (candidate, lessons, students, groups, ignoreId = null) => {
  const ids = lessonParticipantIds(candidate, students, groups);
  if (!ids.length || !candidate.date || !candidate.time) return [];
  const range = lessonRange(candidate);
  return lessons.filter(l => l.id !== ignoreId && l.status === 'planned' && l.date === candidate.date).filter(l => {
    if (!rangesOverlap(range, lessonRange(l))) return false;
    const otherIds = lessonParticipantIds(l, students, groups);
    return ids.some(id => otherIds.includes(id));
  });
};
const conflictText = (conflicts, groups, students) => conflicts.map(l => {
  const name = l.type === 'group' ? groups.find(g => g.id === l.targetId)?.name || 'Группа' : students.find(s => s.id === l.targetId)?.name || 'Ученик';
  return `${fmtDate(l.date)} ${l.time} · ${name}`;
}).join('\n');
const parseAvailability = text => {
  const days = {
    пн: 1,
    вт: 2,
    ср: 3,
    чт: 4,
    пт: 5,
    сб: 6,
    вс: 0
  };
  const result = [];
  String(text || '').split(/\n+/).forEach(line => {
    const lower = line.trim().toLowerCase();
    const dayKey = Object.keys(days).find(d => lower.startsWith(d));
    if (!dayKey) return;
    const times = [...lower.matchAll(/(\d{1,2}):?(\d{2})?\s*[-–—]\s*(\d{1,2}):?(\d{2})?/g)];
    times.forEach(m => {
      const start = Number(m[1]) * 60 + Number(m[2] || 0);
      const end = Number(m[3]) * 60 + Number(m[4] || 0);
      if (end > start) result.push({
        day: days[dayKey],
        start,
        end
      });
    });
  });
  return result;
};
const commonAvailability = members => {
  const parsed = members.map(s => parseAvailability(s.availabilityNotes));
  if (!parsed.length || parsed.some(list => !list.length)) return [];
  let common = parsed[0];
  parsed.slice(1).forEach(list => {
    common = common.flatMap(a => list.filter(b => a.day === b.day).map(b => ({
      day: a.day,
      start: Math.max(a.start, b.start),
      end: Math.min(a.end, b.end)
    }))).filter(x => x.end - x.start >= 45);
  });
  return common.sort((a, b) => a.day - b.day || a.start - b.start).slice(0, 8);
};
const nextDateForDow = day => {
  const d = new Date();
  const current = d.getDay();
  d.setDate(d.getDate() + (day - current + 7) % 7);
  return localDateString(d);
};
const DAY_FULL = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  0: 'Вс'
};

// ── ICONS ──────────────────────────────────────────────────────────────────────
const Ico = ({
  p,
  children,
  size = 22,
  cls = '',
  sw = 2
}) => _jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: cls,
  children: p ? _jsx("path", {
    d: p
  }) : children
});
const IcoHome = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), _jsx("polyline", {
    points: "9 22 9 12 15 12 15 22"
  })]
});
const IcoCal = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), _jsx("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), _jsx("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), _jsx("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })]
});
const IcoUsers = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), _jsx("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), _jsx("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), _jsx("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })]
});
const IcoWallet = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M21 12V7H5a2 2 0 0 1 0-4h14v4"
  }), _jsx("path", {
    d: "M3 5v14a2 2 0 0 0 2 2h16v-5"
  }), _jsx("path", {
    d: "M18 12a2 2 0 0 0 0 4h4v-4Z"
  })]
});
const IcoPlus = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), _jsx("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })]
});
const IcoX = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), _jsx("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })]
});
const IcoEdit = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), _jsx("path", {
    d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"
  })]
});
const IcoTrash = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("polyline", {
    points: "3 6 5 6 21 6"
  }), _jsx("path", {
    d: "M19 6l-1 14H6L5 6"
  }), _jsx("path", {
    d: "M10 11v6M14 11v6M9 6V4h6v2"
  })]
});
const IcoPhone = p => _jsx(Ico, {
  p: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.34 19.79 19.79 0 0 1 1.61 3.72 2 2 0 0 1 3.59 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.26a16 16 0 0 0 6.21 6.21l1.62-1.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  ...p
});
const IcoCheck = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), _jsx("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })]
});
const IcoPlay = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), _jsx("polygon", {
    points: "10 8 16 12 10 16 10 8"
  })]
});
const IcoChevL = p => _jsx(Ico, {
  ...p,
  children: _jsx("polyline", {
    points: "15 18 9 12 15 6"
  })
});
const IcoChevR = p => _jsx(Ico, {
  ...p,
  children: _jsx("polyline", {
    points: "9 18 15 12 9 6"
  })
});
const IcoRepeat = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("polyline", {
    points: "17 1 21 5 17 9"
  }), _jsx("path", {
    d: "M3 11V9a4 4 0 0 1 4-4h14"
  }), _jsx("polyline", {
    points: "7 23 3 19 7 15"
  }), _jsx("path", {
    d: "M21 13v2a4 4 0 0 1-4 4H3"
  })]
});
const IcoStar = p => _jsx(Ico, {
  ...p,
  children: _jsx("path", {
    d: "m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"
  })
});
const IcoLoader = p => _jsx(Ico, {
  ...p,
  children: _jsx("path", {
    d: "M21 12a9 9 0 1 1-6.2-8.6",
    cls: "spin"
  })
});
const IcoSearch = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), _jsx("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })]
});
const IcoBook = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("path", {
    d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
  }), _jsx("path", {
    d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
  })]
});
const IcoPrint = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), _jsx("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), _jsx("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8"
  })]
});
const IcoLightbulb = p => _jsxs(Ico, {
  ...p,
  children: [_jsx("line", {
    x1: "9",
    y1: "18",
    x2: "15",
    y2: "18"
  }), _jsx("line", {
    x1: "10",
    y1: "22",
    x2: "14",
    y2: "22"
  }), _jsx("path", {
    d: "M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"
  })]
});

// ── DEFAULT MESSAGE TEMPLATES ───────────────────────────────────────────────────
const DEFAULT_TEMPLATES = [{
  id: 'reminder',
  name: 'Напоминание',
  body: 'Привет! Напоминаю: занятие {lessonDate}.'
}, {
  id: 'debt',
  name: 'Долг',
  body: 'Привет! По занятиям сейчас долг {balance}. Когда удобно будет оплатить?'
}, {
  id: 'homework',
  name: 'Домашка',
  body: 'Привет! Домашка к следующему занятию: {homework}.'
}, {
  id: 'reschedule',
  name: 'Перенос',
  body: 'Привет! Нужно перенести занятие {lessonDate}. Напиши, пожалуйста, когда удобно.'
}];
const renderTemplate = (body, student, targetLesson, lastHomework) => {
  const lessonText = targetLesson ? `${fmtDate(targetLesson.date)} в ${targetLesson.time}` : 'ближайшее занятие';
  return (body || '').replace(/\{name\}/g, student?.name || '').replace(/\{lessonDate\}/g, lessonText).replace(/\{balance\}/g, money(Math.abs(student?.balance || 0))).replace(/\{homework\}/g, lastHomework || 'пока не записана');
};
const IcoTg = ({
  size = 22
}) => _jsx("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: _jsx("path", {
    d: "M21.8 2.4a1.5 1.5 0 0 0-1.7-.3L2.6 9.4a1.5 1.5 0 0 0 .1 2.8l4.2 1.3 1.6 5a1.5 1.5 0 0 0 2.4.6l2.3-2.1 4.3 3.2a1.5 1.5 0 0 0 2.3-1l2.5-15a1.5 1.5 0 0 0-.5-1.8z",
    fill: "currentColor"
  })
});

// ── UNDO TOAST ──────────────────────────────────────────────────────────────────
function UndoToast({
  pendingUndo,
  onUndo
}) {
  if (!pendingUndo) return null;
  return _jsxs("div", {
    style: {
      position: 'fixed',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'var(--black)',
      color: 'var(--white)',
      border: '2.5px solid var(--black)',
      borderRadius: 4,
      boxShadow: '4px 4px 0 rgba(0,0,0,.4)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px',
      fontFamily: 'Martian Mono,monospace',
      fontSize: 12,
      maxWidth: 340,
      width: 'calc(100% - 32px)',
      animation: 'slideDown .2s ease'
    },
    children: [_jsx("span", {
      style: {
        flex: 1
      },
      children: pendingUndo.label
    }), _jsx("button", {
      onClick: onUndo,
      style: {
        background: 'var(--yellow)',
        color: 'var(--black)',
        border: 'none',
        borderRadius: 3,
        padding: '6px 12px',
        fontFamily: 'Unbounded,cursive',
        fontSize: 10,
        fontWeight: 700,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0
      },
      children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"
    })]
  });
}
function EmptyState({
  title,
  text,
  action,
  onAction,
  secondary,
  onSecondary
}) {
  return _jsxs("div", {
    className: "empty-state",
    children: [_jsx("div", {
      className: "empty-state-title",
      children: title
    }), _jsx("div", {
      className: "empty-state-text",
      children: text
    }), _jsxs("div", {
      style: {
        display: 'flex',
        gap: 8,
        justifyContent: 'center',
        flexWrap: 'wrap'
      },
      children: [action && _jsx("button", {
        className: "btn btn-sm btn-black",
        onClick: onAction,
        children: action
      }), secondary && _jsx("button", {
        className: "btn btn-sm btn-white",
        onClick: onSecondary,
        children: secondary
      })]
    })]
  });
}

// ── SWIPE HOOK ─────────────────────────────────────────────────────────────────
const useSwipe = (onLeft, onRight, threshold = 60) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let sx = 0,
      sy = 0;
    const ts = e => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const te = e => {
      const dx = e.changedTouches[0].clientX - sx,
        dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > threshold && Math.abs(dy) < Math.abs(dx) * 0.6) {
        if (dx < 0 && onLeft) onLeft();
        if (dx > 0 && onRight) onRight();
      }
    };
    el.addEventListener('touchstart', ts, {
      passive: true
    });
    el.addEventListener('touchend', te, {
      passive: true
    });
    return () => {
      el.removeEventListener('touchstart', ts);
      el.removeEventListener('touchend', te);
    };
  }, [onLeft, onRight]);
  return ref;
};

// ── SEARCH COMPONENT ───────────────────────────────────────────────────────────
function SearchModal({
  students,
  groups,
  lessons,
  onClose,
  onOpenStudent,
  onOpenGroup,
  onOpenLesson
}) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);
  const lq = q.toLowerCase().trim();
  const rStudents = lq ? students.filter(s => s.name.toLowerCase().includes(lq)).slice(0, 5) : [];
  const rGroups = lq ? groups.filter(g => g.name.toLowerCase().includes(lq)).slice(0, 4) : [];
  const rLessons = lq ? lessons.filter(l => (l.topic || '').toLowerCase().includes(lq) || (l.homework || '').toLowerCase().includes(lq)).slice(0, 4) : [];
  const hasResults = rStudents.length || rGroups.length || rLessons.length;
  return _jsxs(_Fragment, {
    children: [_jsx("div", {
      className: "search-overlay",
      onClick: onClose
    }), _jsxs("div", {
      className: "search-panel",
      children: [_jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          alignItems: 'center'
        },
        children: [_jsx(IcoSearch, {
          size: 18
        }), _jsx("input", {
          ref: inputRef,
          className: "input",
          value: q,
          onChange: e => setQ(e.target.value),
          placeholder: "\u041F\u043E\u0438\u0441\u043A \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432, \u0433\u0440\u0443\u043F\u043F, \u0442\u0435\u043C...",
          style: {
            boxShadow: 'none',
            border: 'none',
            flex: 1,
            padding: '8px 0'
          }
        }), _jsx("button", {
          onClick: onClose,
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          },
          children: _jsx(IcoX, {
            size: 18
          })
        })]
      }), lq && _jsxs("div", {
        style: {
          maxHeight: 360,
          overflowY: 'auto',
          marginTop: 8
        },
        children: [rStudents.length > 0 && _jsxs(_Fragment, {
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 9,
              fontWeight: 900,
              padding: '6px 0',
              color: 'var(--text-sec)',
              textTransform: 'uppercase'
            },
            children: "\u0423\u0447\u0435\u043D\u0438\u043A\u0438"
          }), rStudents.map(s => _jsxs("div", {
            className: "search-result",
            onClick: () => {
              onOpenStudent(s);
              onClose();
            },
            children: [_jsx(IcoUsers, {
              size: 15
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontWeight: 700,
                  fontSize: 13
                },
                children: s.name
              }), _jsxs("div", {
                style: {
                  fontSize: 10,
                  color: 'var(--text-sec)'
                },
                children: [money(s.rate), "/\u0443\u0440\u043E\u043A"]
              })]
            })]
          }, s.id))]
        }), rGroups.length > 0 && _jsxs(_Fragment, {
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 9,
              fontWeight: 900,
              padding: '6px 0',
              color: 'var(--text-sec)',
              textTransform: 'uppercase'
            },
            children: "\u0413\u0440\u0443\u043F\u043F\u044B"
          }), rGroups.map(g => _jsxs("div", {
            className: "search-result",
            onClick: () => {
              onOpenGroup(g);
              onClose();
            },
            children: [_jsx(IcoBook, {
              size: 15
            }), _jsxs("div", {
              style: {
                fontWeight: 700,
                fontSize: 13
              },
              children: [g.emoji || '', " ", g.name]
            })]
          }, g.id))]
        }), rLessons.length > 0 && _jsxs(_Fragment, {
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 9,
              fontWeight: 900,
              padding: '6px 0',
              color: 'var(--text-sec)',
              textTransform: 'uppercase'
            },
            children: "\u0423\u0440\u043E\u043A\u0438 (\u043F\u043E \u0442\u0435\u043C\u0435)"
          }), rLessons.map(l => _jsxs("div", {
            className: "search-result",
            onClick: () => {
              onOpenLesson(l);
              onClose();
            },
            children: [_jsx(IcoCal, {
              size: 15
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontWeight: 700,
                  fontSize: 12
                },
                children: l.topic || l.homework
              }), _jsxs("div", {
                style: {
                  fontSize: 10,
                  color: 'var(--text-sec)'
                },
                children: [fmtDate(l.date), " \xB7 ", l.time]
              })]
            })]
          }, l.id))]
        }), !hasResults && _jsx("div", {
          style: {
            padding: 20,
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: 12
          },
          children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"
        })]
      })]
    })]
  });
}

// ── TIMER BANNER ───────────────────────────────────────────────────────────────
function TimerBanner({
  lesson,
  name,
  onAttend
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const start = new Date(`${lesson.date}T${lesson.time}`).getTime();
  const end = start + (lesson.duration || 60) * 60000;
  const progress = Math.min(1, Math.max(0, (now - start) / (end - start)));
  const remaining = Math.max(0, Math.ceil((end - now) / 60000));
  return _jsxs("div", {
    className: "timer-banner timer-pulse",
    children: [_jsxs("div", {
      style: {
        flex: 1
      },
      children: [_jsxs("div", {
        style: {
          fontFamily: 'Unbounded,cursive',
          fontSize: 11,
          fontWeight: 900
        },
        children: ["\u0418\u0434\u0451\u0442 \u0443\u0440\u043E\u043A: ", name]
      }), _jsxs("div", {
        style: {
          fontSize: 12,
          marginTop: 4
        },
        children: ["\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ", remaining, " \u043C\u0438\u043D"]
      }), _jsx("div", {
        className: "timer-bar",
        style: {
          marginTop: 6
        },
        children: _jsx("div", {
          className: "timer-fill",
          style: {
            width: `${progress * 100}%`
          }
        })
      })]
    }), _jsx("button", {
      className: "btn btn-sm btn-black",
      onClick: onAttend,
      children: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C"
    })]
  });
}

// ── NOTIFICATION GENERATOR ─────────────────────────────────────────────────────
const generateNotifications = (lessons, students, groups) => {
  const notifs = [];
  const now = new Date();
  const today = localDateString();
  // Upcoming lesson in 15 min
  lessons.filter(l => l.status === 'planned' && l.date === today).forEach(l => {
    const t = new Date(`${l.date}T${l.time}`);
    const diff = (t - now) / 60000;
    if (diff > 0 && diff <= 15) notifs.push({
      id: 'soon_' + l.id,
      icon: '⏰',
      text: `Урок через ${Math.ceil(diff)} мин`,
      sub: l.time
    });
  });
  // Debtors > 2 lessons worth
  students.filter(s => !s.archived && s.balance < -s.rate * 2).forEach(s => {
    notifs.push({
      id: 'debt_' + s.id,
      icon: '💸',
      text: `${s.name}: долг ${money(Math.abs(s.balance))}`,
      sub: 'Большая задолженность'
    });
  });
  // Package ending
  students.filter(s => !s.archived && (s.packageLessons || 0) === 1).forEach(s => {
    notifs.push({
      id: 'pkg_' + s.id,
      icon: '📦',
      text: `${s.name}: абонемент заканчивается`,
      sub: 'Остался 1 урок'
    });
  });
  // Tomorrow lessons count
  const tmrw = new Date(now);
  tmrw.setDate(tmrw.getDate() + 1);
  const tmrwStr = localDateString(tmrw);
  const tmrwCount = lessons.filter(l => l.date === tmrwStr && l.status === 'planned').length;
  if (tmrwCount > 0) notifs.push({
    id: 'tmrw',
    icon: '📅',
    text: `Завтра ${tmrwCount} урок(ов)`,
    sub: ''
  });
  return notifs;
};

// ── MODALS ─────────────────────────────────────────────────────────────────────
function Modal({
  title,
  onClose,
  children
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = () => [...(modalRef.current?.querySelectorAll(focusableSelector) || [])].filter(el => !el.disabled && el.offsetParent !== null);
    const prevFocus = document.activeElement;
    setTimeout(() => focusables()[0]?.focus(), 0);
    const fn = e => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
      prevFocus?.focus?.();
    };
  }, []);
  return _jsx("div", {
    className: "modal-overlay",
    onClick: e => e.target === e.currentTarget && onClose(),
    children: _jsxs("div", {
      className: "modal",
      ref: modalRef,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      children: [_jsxs("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: 'var(--border)'
        },
        children: [_jsx("div", {
          className: "modal-title",
          style: {
            marginBottom: 0,
            paddingBottom: 0,
            borderBottom: 'none'
          },
          children: title
        }), _jsx("button", {
          onClick: onClose,
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: 'var(--black)'
          },
          children: _jsx(IcoX, {
            size: 20
          })
        })]
      }), children]
    })
  });
}
function FormField({
  label,
  children
}) {
  return _jsxs("div", {
    style: {
      marginBottom: 14
    },
    children: [_jsx("label", {
      className: "label",
      children: label
    }), children]
  });
}
function StudentModal({
  student,
  onClose,
  onSave
}) {
  const [name, setName] = useState(student?.name || '');
  const [rate, setRate] = useState(student?.rate || 1500);
  const [phone, setPhone] = useState(student?.phone || '');
  const [tgId, setTgId] = useState(student?.tgId || '');
  const [subjects, setSubjects] = useState(student?.subjects || ['История']);
  const [goal, setGoal] = useState(student?.goal || '');
  const [notes, setNotes] = useState(student?.notes || '');
  const [availabilityNotes, setAvailabilityNotes] = useState(student?.availabilityNotes || '');
  const [archived, setArchived] = useState(!!student?.archived);
  const [lessonRates, setLessonRates] = useState(student?.lessonRates || {});
  const toggleSubject = subject => setSubjects(p => p.includes(subject) ? p.filter(x => x !== subject) : [...p, subject]);
  const submit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    const lr = {};
    Object.entries(lessonRates).forEach(([k, v]) => {
      if (String(v).trim() !== '') lr[k] = Number(v);
    });
    onSave({
      name,
      rate: Number(rate),
      phone,
      tgId,
      subjects: subjects.length ? subjects : ['История'],
      goal,
      notes,
      availabilityNotes,
      archived,
      lessonRates: lr
    });
  };
  return _jsx(Modal, {
    title: student ? 'Редактировать' : 'Новый ученик',
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsx(FormField, {
        label: "\u0418\u043C\u044F",
        children: _jsx("input", {
          className: "input",
          required: true,
          value: name,
          onChange: e => setName(e.target.value),
          placeholder: "\u0424\u0418\u041E"
        })
      }), _jsx(FormField, {
        label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B",
        children: _jsx("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8
          },
          children: SUBJECTS.map(subject => _jsx("button", {
            type: "button",
            className: `btn btn-sm btn-full ${subjects.includes(subject) ? 'btn-black' : 'btn-white'}`,
            onClick: () => toggleSubject(subject),
            children: subject
          }, subject))
        })
      }), _jsx(FormField, {
        label: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0432\u043A\u0430 \u20BD/\u0443\u0440\u043E\u043A",
        children: _jsx("input", {
          className: "input",
          type: "number",
          required: true,
          value: rate,
          onChange: e => setRate(e.target.value)
        })
      }), subjects.length > 1 && _jsx(FormField, {
        label: "\u0421\u0442\u0430\u0432\u043A\u0438 \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430\u043C (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
        children: subjects.map(subject => _jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6
          },
          children: [_jsx("span", {
            style: {
              fontSize: 11,
              minWidth: 88,
              fontFamily: 'Unbounded,cursive',
              fontWeight: 700
            },
            children: subject
          }), _jsx("input", {
            className: "input",
            type: "number",
            min: "0",
            placeholder: `${rate} ₽`,
            value: lessonRates[subject] ?? '',
            onChange: e => setLessonRates(p => ({
              ...p,
              [subject]: e.target.value
            })),
            style: {
              padding: '6px 8px',
              fontSize: 12
            }
          })]
        }, subject))
      }), _jsx(FormField, {
        label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
        children: _jsx("input", {
          className: "input",
          value: phone,
          onChange: e => setPhone(e.target.value),
          placeholder: "+7 ..."
        })
      }), _jsx(FormField, {
        label: "Telegram (username \u0438\u043B\u0438 ID)",
        children: _jsx("input", {
          className: "input",
          value: tgId,
          onChange: e => setTgId(e.target.value),
          placeholder: "@username \u0438\u043B\u0438 123456789"
        })
      }), _jsx(FormField, {
        label: "\u0426\u0435\u043B\u044C",
        children: _jsx("input", {
          className: "input",
          value: goal,
          onChange: e => setGoal(e.target.value),
          placeholder: "\u0415\u0413\u042D \u0438\u0441\u0442\u043E\u0440\u0438\u044F, \u041E\u0413\u042D, \u0448\u043A\u043E\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430"
        })
      }), _jsx(FormField, {
        label: "\u0414\u043E\u043F. \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 / \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0435 \u043E\u043A\u043D\u0430",
        children: _jsx("textarea", {
          className: "input",
          value: availabilityNotes,
          onChange: e => setAvailabilityNotes(e.target.value),
          placeholder: "\u041F\u043D 15:00-18:00\n\u0421\u0440 16:30-19:00\n\u0421\u0431 10:00-13:00",
          style: {
            minHeight: 86,
            resize: 'vertical'
          }
        })
      }), _jsx(FormField, {
        label: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
        children: _jsx("textarea", {
          className: "input",
          value: notes,
          onChange: e => setNotes(e.target.value),
          placeholder: "\u0421\u043B\u0430\u0431\u044B\u0435 \u0442\u0435\u043C\u044B, \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C, \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438",
          style: {
            minHeight: 74,
            resize: 'vertical'
          }
        })
      }), student && _jsxs("div", {
        className: `check-row ${archived ? 'checked' : ''}`,
        onClick: () => setArchived(!archived),
        children: [_jsx("span", {
          style: {
            fontWeight: 700
          },
          children: "\u0410\u0440\u0445\u0438\u0432\u043D\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A"
        }), _jsx("div", {
          className: `check-box ${archived ? 'checked' : ''}`,
          children: archived && _jsx(IcoCheck, {
            size: 14
          })
        })]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginTop: 8
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: "btn btn-black btn-full",
          children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
        })]
      })]
    })
  });
}
function GroupModal({
  group,
  students,
  onClose,
  onSave
}) {
  const [name, setName] = useState(group?.name || '');
  const [emoji, setEmoji] = useState(group?.emoji || '');
  const [subject, setSubject] = useState(group?.subject || 'История');
  const [sel, setSel] = useState(group?.studentIds || []);
  const [archived, setArchived] = useState(!!group?.archived);
  const [rateOverrides, setRateOverrides] = useState(group?.rateOverrides || {});
  const availableStudents = students.filter(s => !s.archived || sel.includes(s.id)).sort((a, b) => Number(sel.includes(b.id)) - Number(sel.includes(a.id)) || a.name.localeCompare(b.name, 'ru'));
  const toggle = id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const submit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    const cleanRates = {};
    Object.entries(rateOverrides).forEach(([id, val]) => {
      if (String(val).trim() !== '') cleanRates[id] = Number(val);
    });
    onSave({
      name,
      emoji,
      subject,
      studentIds: sel,
      rateOverrides: cleanRates,
      archived
    });
  };
  return _jsx(Modal, {
    title: group ? 'Редактировать группу' : 'Новая группа',
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '72px 1fr',
          gap: 10,
          marginBottom: 14
        },
        children: [_jsxs("div", {
          children: [_jsx("label", {
            className: "label",
            children: "\u0421\u043C\u0430\u0439\u043B"
          }), _jsx("input", {
            className: "input",
            value: emoji,
            onChange: e => setEmoji(e.target.value),
            placeholder: "\uD83C\uDFDB\uFE0F",
            style: {
              textAlign: 'center',
              fontSize: 22,
              padding: '6px'
            }
          })]
        }), _jsx(FormField, {
          label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
          children: _jsx("input", {
            className: "input",
            required: true,
            value: name,
            onChange: e => setName(e.target.value)
          })
        })]
      }), _jsx(FormField, {
        label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442",
        children: _jsx("select", {
          className: "input",
          value: subject,
          onChange: e => setSubject(e.target.value),
          children: SUBJECTS.map(s => _jsx("option", {
            value: s,
            children: s
          }, s))
        })
      }), _jsx("div", {
        className: "label",
        style: {
          marginBottom: 8
        },
        children: "\u0423\u0447\u0435\u043D\u0438\u043A\u0438"
      }), _jsx("div", {
        style: {
          maxHeight: 240,
          overflowY: 'auto'
        },
        children: availableStudents.map(s => _jsxs("div", {
          className: `check-row ${sel.includes(s.id) ? 'checked' : ''}`,
          style: {
            alignItems: 'flex-start',
            gap: 10
          },
          children: [_jsxs("div", {
            onClick: () => toggle(s.id),
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              cursor: 'pointer'
            },
            children: [_jsx("div", {
              className: `check-box ${sel.includes(s.id) ? 'checked' : ''}`,
              children: sel.includes(s.id) && _jsx(IcoCheck, {
                size: 14,
                style: {
                  stroke: 'var(--black)'
                }
              })
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontWeight: 700
                },
                children: s.name
              }), _jsxs("div", {
                style: {
                  fontSize: 10,
                  color: '#666'
                },
                children: ["\u043E\u0431\u044B\u0447\u043D\u0430\u044F \u0441\u0442\u0430\u0432\u043A\u0430 ", money(s.rate)]
              })]
            })]
          }), sel.includes(s.id) && _jsx("input", {
            className: "input",
            type: "number",
            placeholder: s.rate,
            value: rateOverrides[s.id] ?? '',
            onChange: e => setRateOverrides(p => ({
              ...p,
              [s.id]: e.target.value
            })),
            style: {
              width: 92,
              padding: '6px 8px',
              fontSize: 11,
              boxShadow: 'var(--shadow)'
            }
          })]
        }, s.id))
      }), _jsxs("div", {
        className: `check-row ${archived ? 'checked' : ''}`,
        onClick: () => setArchived(!archived),
        style: {
          marginTop: 10
        },
        children: [_jsx("span", {
          style: {
            fontWeight: 700
          },
          children: "\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443"
        }), _jsx("div", {
          className: `check-box ${archived ? 'checked' : ''}`,
          children: archived && _jsx(IcoCheck, {
            size: 14
          })
        })]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginTop: 12
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: "btn btn-black btn-full",
          children: group ? 'Сохранить' : 'Создать'
        })]
      })]
    })
  });
}
function TransactionModal({
  tx,
  students,
  onClose,
  onSave
}) {
  const [sid, setSid] = useState(tx?.studentId || students[0]?.id || '');
  const [type, setType] = useState(tx?.type || 'payment');
  const [amt, setAmt] = useState(tx?.amount || '');
  const [date, setDate] = useState(tx?.date || getTodayDate());
  const [comment, setComment] = useState(tx?.comment || '');
  const submit = e => {
    e.preventDefault();
    if (!sid || Number(amt) <= 0) return;
    onSave({
      studentId: Number(sid),
      type,
      amount: Number(amt),
      date,
      comment
    });
  };
  if (!students.length) {
    return _jsx(Modal, {
      title: "\u041D\u043E\u0432\u0430\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F",
      onClose: onClose,
      children: _jsx(EmptyState, {
        title: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u0435\u043D \u0443\u0447\u0435\u043D\u0438\u043A",
        text: "\u041E\u043F\u043B\u0430\u0442\u0443 \u0438\u043B\u0438 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043A \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u043C\u0443 \u0443\u0447\u0435\u043D\u0438\u043A\u0443."
      })
    });
  }
  return _jsx(Modal, {
    title: tx ? 'Редактировать операцию' : 'Новая операция',
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsx(FormField, {
        label: "\u0423\u0447\u0435\u043D\u0438\u043A",
        children: _jsx("select", {
          className: "input",
          value: sid,
          onChange: e => setSid(e.target.value),
          children: students.map(s => _jsxs("option", {
            value: s.id,
            children: [s.name, " (", s.balance > 0 ? '+' : '', s.balance, " \u20BD)"]
          }, s.id))
        })
      }), _jsxs("div", {
        className: "toggle-row",
        children: [_jsx("button", {
          type: "button",
          className: `toggle-opt ${type === 'payment' ? 'active' : ''}`,
          onClick: () => setType('payment'),
          children: "+ \u041E\u043F\u043B\u0430\u0442\u0430"
        }), _jsx("button", {
          type: "button",
          className: `toggle-opt ${type === 'charge' ? 'active' : ''}`,
          onClick: () => setType('charge'),
          children: "\u2212 \u0421\u043F\u0438\u0441\u0430\u043D\u0438\u0435"
        })]
      }), _jsx(FormField, {
        label: "\u0421\u0443\u043C\u043C\u0430 \u20BD",
        children: _jsx("input", {
          className: "input",
          type: "number",
          required: true,
          min: "1",
          value: amt,
          onChange: e => setAmt(e.target.value),
          placeholder: "0"
        })
      }), _jsx(FormField, {
        label: "\u0414\u0430\u0442\u0430",
        children: _jsx("input", {
          className: "input",
          type: "date",
          required: true,
          value: date,
          onChange: e => setDate(e.target.value)
        })
      }), _jsx(FormField, {
        label: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
        children: _jsx("input", {
          className: "input",
          value: comment,
          onChange: e => setComment(e.target.value),
          placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u043C\u0430\u0440\u0442"
        })
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginTop: 8
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: `btn btn-full ${type === 'payment' ? 'btn-green' : 'btn-red'}`,
          children: tx ? 'Сохранить' : 'Провести'
        })]
      })]
    })
  });
}
function LessonModal({
  students,
  groups,
  initialDate,
  initialStudentId,
  initialType,
  initialTargetId,
  initialTime,
  lessonToEdit,
  onClose,
  onSave
}) {
  const [type, setType] = useState(lessonToEdit?.type || initialType || (initialStudentId ? 'individual' : 'group'));
  const [targetId, setTgt] = useState(lessonToEdit ? String(lessonToEdit.targetId) : initialTargetId ? String(initialTargetId) : initialStudentId ? String(initialStudentId) : '');
  const [subject, setSubject] = useState(lessonToEdit?.subject || 'История');
  const [date, setDate] = useState(lessonToEdit?.date || initialDate || getTodayDate());
  const [time, setTime] = useState(lessonToEdit?.time || initialTime || '15:00');
  const [days, setDays] = useState([]);
  const [recurring, setRec] = useState(false);
  const [weeks, setWeeks] = useState(4);
  const [repeatUntil, setRepeatUntil] = useState(() => {
    const d = new Date((lessonToEdit?.date || initialDate || getTodayDate()) + 'T00:00:00');
    d.setDate(d.getDate() + 28);
    return localDateString(d);
  });
  const [applySeries, setApplySeries] = useState(false);
  const [topic, setTopic] = useState(lessonToEdit?.topic || '');
  const [homework, setHomework] = useState(lessonToEdit?.homework || '');
  const [lessonNote, setLessonNote] = useState(lessonToEdit?.lessonNote || '');
  const [duration, setDuration] = useState(lessonToEdit?.duration || 60);
  const activeGroups = groups.filter(g => !g.archived || lessonToEdit?.targetId === g.id);
  const activeStudents = students.filter(s => !s.archived || lessonToEdit?.targetId === s.id || initialStudentId === s.id);
  useEffect(() => {
    if (!lessonToEdit && days.length === 0 && date) setDays([new Date(date).getDay()]);
  }, [date]);
  useEffect(() => {
    if (type === 'individual' && activeStudents.length && !targetId) setTgt(String(activeStudents[0].id));
    if (type === 'group' && activeGroups.length && (!targetId || !activeGroups.find(g => g.id === Number(targetId)))) setTgt(String(activeGroups[0].id));
  }, [type, groups]);
  useEffect(() => {
    if (lessonToEdit) return;
    if (type === 'group') {
      const g = activeGroups.find(x => x.id === Number(targetId));
      if (g?.subject) setSubject(g.subject);
    } else {
      const s = activeStudents.find(x => x.id === Number(targetId));
      if (s?.subjects?.length) setSubject(s.subjects[0]);
    }
  }, [type, targetId]);
  if (!lessonToEdit && !activeGroups.length && !activeStudents.length) {
    return _jsx(Modal, {
      title: "\u041D\u043E\u0432\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435",
      onClose: onClose,
      children: _jsx(EmptyState, {
        title: "\u041D\u0435\u043A\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        text: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u0438\u043B\u0438 \u0433\u0440\u0443\u043F\u043F\u0443, \u043F\u043E\u0442\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435."
      })
    });
  }
  const toggleDay = d => {
    if (days.includes(d)) {
      if (days.length > 1) setDays(days.filter(x => x !== d));
    } else setDays([...days, d].sort());
  };
  const submit = e => {
    e.preventDefault();
    if (!targetId) return;
    const base = {
      type,
      targetId: Number(targetId),
      subject,
      time,
      duration: Number(duration),
      topic,
      homework,
      lessonNote
    };
    if (lessonToEdit) {
      onSave([{
        ...base,
        date
      }], {
        applySeries
      });
      return;
    }
    const arr = [];
    const seriesId = recurring || days.length > 1 ? Date.now() : null;
    const [y, m, dd] = date.split('-').map(Number);
    const baseDate = new Date(y, m - 1, dd);
    days.forEach(di => {
      let iter = new Date(baseDate);
      const curr = iter.getDay();
      iter.setDate(iter.getDate() + (di - curr + 7) % 7);
      const until = new Date((repeatUntil || date) + 'T23:59:59');
      const wc = recurring ? 104 : 1;
      for (let i = 0; i < wc; i++) {
        const nd = new Date(iter);
        nd.setDate(iter.getDate() + i * 7);
        if (recurring && nd > until) break;
        arr.push({
          ...base,
          seriesId,
          date: `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, '0')}-${String(nd.getDate()).padStart(2, '0')}`
        });
      }
    });
    onSave(arr);
  };
  return _jsx(Modal, {
    title: lessonToEdit ? 'Изменить занятие' : 'Новое занятие',
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsxs("div", {
        className: "toggle-row",
        style: {
          marginBottom: 14
        },
        children: [_jsx("button", {
          type: "button",
          className: `toggle-opt ${type === 'group' ? 'active' : ''}`,
          onClick: () => setType('group'),
          children: "\u0413\u0440\u0443\u043F\u043F\u0430"
        }), _jsx("button", {
          type: "button",
          className: `toggle-opt ${type === 'individual' ? 'active' : ''}`,
          onClick: () => setType('individual'),
          children: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E"
        })]
      }), _jsx(FormField, {
        label: type === 'group' ? 'Группа' : 'Ученик',
        children: _jsx("select", {
          className: "input",
          required: true,
          value: targetId,
          onChange: e => setTgt(e.target.value),
          children: type === 'individual' ? activeStudents.map(s => _jsxs("option", {
            value: s.id,
            children: [s.name, s.archived ? ' (архив)' : '']
          }, s.id)) : activeGroups.map(g => _jsxs("option", {
            value: g.id,
            children: [g.name, g.archived ? ' (архив)' : '']
          }, g.id))
        })
      }), _jsx(FormField, {
        label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442",
        children: _jsx("select", {
          className: "input",
          required: true,
          value: subject,
          onChange: e => setSubject(e.target.value),
          children: SUBJECTS.map(s => _jsx("option", {
            value: s,
            children: s
          }, s))
        })
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 14
        },
        children: [_jsxs("div", {
          children: [_jsx("label", {
            className: "label",
            children: lessonToEdit ? 'Дата' : 'Дата начала'
          }), _jsx("input", {
            className: "input",
            type: "date",
            required: true,
            value: date,
            onChange: e => setDate(e.target.value)
          })]
        }), _jsxs("div", {
          children: [_jsx("label", {
            className: "label",
            children: "\u0412\u0440\u0435\u043C\u044F"
          }), _jsx("input", {
            className: "input",
            type: "time",
            required: true,
            value: time,
            onChange: e => setTime(e.target.value)
          })]
        })]
      }), _jsx(FormField, {
        label: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
        children: _jsx("div", {
          style: {
            display: 'flex',
            gap: 6
          },
          children: [30, 45, 60, 90, 120].map(d => _jsx("button", {
            type: "button",
            onClick: () => setDuration(d),
            className: `btn btn-sm ${duration === d ? 'btn-black' : 'btn-white'}`,
            style: {
              flex: 1,
              padding: '7px 2px',
              fontSize: 10,
              fontFamily: 'Unbounded,cursive',
              fontWeight: 700
            },
            children: d < 60 ? `${d}м` : d === 60 ? '1ч' : d === 90 ? '1.5ч' : '2ч'
          }, d))
        })
      }), _jsx(FormField, {
        label: "\u0422\u0435\u043C\u0430 \u0443\u0440\u043E\u043A\u0430",
        children: _jsx("input", {
          className: "input",
          value: topic,
          onChange: e => setTopic(e.target.value),
          placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0440\u0435\u0444\u043E\u0440\u043C\u044B \u041F\u0435\u0442\u0440\u0430 I"
        })
      }), _jsx(FormField, {
        label: "\u0414\u043E\u043C\u0430\u0448\u043A\u0430",
        children: _jsx("textarea", {
          className: "input",
          value: homework,
          onChange: e => setHomework(e.target.value),
          placeholder: "\u0427\u0442\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C\u0443 \u0443\u0440\u043E\u043A\u0443",
          style: {
            minHeight: 70,
            resize: 'vertical'
          }
        })
      }), _jsx(FormField, {
        label: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u043F\u043E\u0441\u043B\u0435 \u0443\u0440\u043E\u043A\u0430",
        children: _jsx("textarea", {
          className: "input",
          value: lessonNote,
          onChange: e => setLessonNote(e.target.value),
          placeholder: "\u0427\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C, \u0447\u0442\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",
          style: {
            minHeight: 70,
            resize: 'vertical'
          }
        })
      }), !lessonToEdit && _jsxs("div", {
        style: {
          background: 'var(--bg-subtle)',
          border: 'var(--border)',
          borderRadius: 8,
          padding: 12,
          marginBottom: 14
        },
        children: [_jsx("div", {
          className: "label",
          style: {
            marginBottom: 8
          },
          children: "\u0414\u043D\u0438 \u043D\u0435\u0434\u0435\u043B\u0438"
        }), _jsx("div", {
          style: {
            display: 'flex',
            gap: 6,
            justifyContent: 'space-between'
          },
          children: DAY_INDEXES.map(i => _jsx("button", {
            type: "button",
            onClick: () => toggleDay(i),
            style: {
              width: 36,
              height: 36,
              border: 'var(--border)',
              borderRadius: 7,
              cursor: 'pointer',
              fontFamily: 'Unbounded,cursive',
              fontSize: 10,
              fontWeight: 700,
              background: days.includes(i) ? 'var(--black)' : 'var(--surface)',
              color: days.includes(i) ? 'var(--yellow)' : 'var(--black)',
              boxShadow: days.includes(i) ? 'none' : 'var(--shadow)'
            },
            children: DAYS_SHORT[i]
          }, i))
        }), _jsxs("div", {
          style: {
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          },
          children: [_jsx("div", {
            className: `check-box ${recurring ? 'checked' : ''}`,
            onClick: () => setRec(!recurring),
            style: {
              cursor: 'pointer'
            },
            children: recurring && _jsx(IcoCheck, {
              size: 14
            })
          }), _jsx("span", {
            style: {
              fontSize: 11,
              fontFamily: 'Unbounded,cursive',
              fontWeight: 700
            },
            children: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E"
          })]
        }), recurring && _jsxs("div", {
          style: {
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          },
          children: [_jsx("span", {
            style: {
              fontSize: 11
            },
            children: "\u0434\u043E"
          }), _jsx("input", {
            className: "input",
            type: "date",
            value: repeatUntil,
            min: date,
            onChange: e => setRepeatUntil(e.target.value),
            style: {
              flex: 1,
              padding: '6px 8px'
            }
          }), _jsx("span", {
            style: {
              fontSize: 11
            },
            children: "\u0432\u043A\u043B."
          })]
        })]
      }), lessonToEdit?.seriesId && _jsxs("div", {
        className: `check-row ${applySeries ? 'checked' : ''}`,
        onClick: () => setApplySeries(!applySeries),
        children: [_jsx("span", {
          style: {
            fontWeight: 700
          },
          children: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0440\u0435\u043C\u044F/\u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u043A\u043E \u0432\u0441\u0435\u0439 \u0441\u0435\u0440\u0438\u0438"
        }), _jsx("div", {
          className: `check-box ${applySeries ? 'checked' : ''}`,
          children: applySeries && _jsx(IcoCheck, {
            size: 14
          })
        })]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginTop: 8
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          disabled: !targetId,
          className: "btn btn-black btn-full",
          children: lessonToEdit ? 'Сохранить' : 'Создать'
        })]
      })]
    })
  });
}
function AttendanceModal({
  lesson,
  students,
  groups,
  onClose,
  onSave
}) {
  const group = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
  const ls = useMemo(() => lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : group?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [], [lesson, students, groups]);
  const [att, setAtt] = useState(() => {
    if (lesson.status === 'completed' && lesson.attendance) return lesson.attendance;
    const a = {};
    ls.forEach(s => a[s.id] = true);
    return a;
  });
  const [topic, setTopic] = useState(lesson.topic || '');
  const [homework, setHomework] = useState(lesson.homework || '');
  const [lessonNote, setLessonNote] = useState(lesson.lessonNote || '');
  const [rating, setRating] = useState(lesson.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const submit = e => {
    e.preventDefault();
    onSave(lesson.id, att, {
      topic,
      homework,
      lessonNote,
      rating
    });
  };
  return _jsxs(Modal, {
    title: "\u041F\u043E\u0441\u0435\u0449\u0430\u0435\u043C\u043E\u0441\u0442\u044C",
    onClose: onClose,
    children: [_jsxs("div", {
      style: {
        background: 'var(--bg-subtle)',
        border: 'var(--border)',
        borderRadius: 8,
        padding: 10,
        marginBottom: 14,
        fontSize: 12
      },
      children: [_jsx("strong", {
        children: fmtDate(lesson.date)
      }), " \u0432 ", _jsx("strong", {
        children: lesson.time
      }), _jsx("div", {
        style: {
          marginTop: 4,
          color: 'var(--text-sec)'
        },
        children: "\u0421\u043D\u0438\u043C\u0438\u0442\u0435 \u0433\u0430\u043B\u043E\u0447\u043A\u0443 \u2014 \u0434\u0435\u043D\u044C\u0433\u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u0441\u044F \u043D\u0430 \u0431\u0430\u043B\u0430\u043D\u0441"
      })]
    }), _jsxs("form", {
      onSubmit: submit,
      children: [_jsx(FormField, {
        label: "\u0422\u0435\u043C\u0430",
        children: _jsx("input", {
          className: "input",
          value: topic,
          onChange: e => setTopic(e.target.value),
          placeholder: "\u0427\u0442\u043E \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u043B\u0438"
        })
      }), _jsx(FormField, {
        label: "\u0414\u043E\u043C\u0430\u0448\u043A\u0430",
        children: _jsx("textarea", {
          className: "input",
          value: homework,
          onChange: e => setHomework(e.target.value),
          placeholder: "\u0427\u0442\u043E \u0437\u0430\u0434\u0430\u0442\u044C",
          style: {
            minHeight: 64,
            resize: 'vertical'
          }
        })
      }), _jsx(FormField, {
        label: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430",
        children: _jsx("textarea", {
          className: "input",
          value: lessonNote,
          onChange: e => setLessonNote(e.target.value),
          placeholder: "\u0427\u0442\u043E \u0432\u0430\u0436\u043D\u043E \u043F\u043E\u043C\u043D\u0438\u0442\u044C",
          style: {
            minHeight: 64,
            resize: 'vertical'
          }
        })
      }), _jsxs("div", {
        style: {
          marginBottom: 14
        },
        children: [_jsx("label", {
          className: "label",
          children: "\u041E\u0446\u0435\u043D\u043A\u0430 \u0443\u0440\u043E\u043A\u0430"
        }), _jsxs("div", {
          style: {
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          },
          children: [[1, 2, 3, 4, 5].map(n => _jsx("button", {
            type: "button",
            onMouseEnter: () => setHoverRating(n),
            onMouseLeave: () => setHoverRating(0),
            onClick: () => setRating(rating === n ? 0 : n),
            style: {
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 2px',
              fontSize: 26,
              lineHeight: 1,
              color: (hoverRating || rating) >= n ? 'var(--yellow)' : 'var(--border-dashed)',
              textShadow: 'none',
              transition: 'color .1s',
              filter: (hoverRating || rating) >= n ? 'drop-shadow(0 0 2px rgba(0,0,0,.3))' : 'none'
            },
            children: "\u2605"
          }, n)), rating > 0 && _jsx("span", {
            style: {
              fontSize: 11,
              color: 'var(--text-sec)',
              marginLeft: 4
            },
            children: ['', 'Слабо', 'Ниже среднего', 'Норм', 'Хорошо', 'Отлично'][rating]
          })]
        })]
      }), ls.map(s => {
        const rate = group?.rateOverrides?.[s.id] ?? s.rate;
        const present = att[s.id] || false;
        return _jsxs("div", {
          className: `check-row ${present ? 'checked' : ''}`,
          onClick: () => setAtt(p => ({
            ...p,
            [s.id]: !p[s.id]
          })),
          children: [_jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontWeight: 700,
                textDecoration: present ? 'none' : 'line-through',
                color: present ? 'var(--black)' : 'var(--text-muted)'
              },
              children: s.name
            }), _jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)'
              },
              children: [rate, " \u20BD"]
            })]
          }), _jsx("div", {
            className: `check-box ${present ? 'checked' : ''}`,
            children: present && _jsx(IcoCheck, {
              size: 14
            })
          })]
        }, s.id);
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginTop: 12
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: "btn btn-green btn-full",
          children: lesson.status === 'completed' ? 'Сохранить' : 'Завершить урок'
        })]
      })]
    })]
  });
}
function LessonStatusModal({
  lesson,
  onClose,
  onStatus,
  onDelete,
  onReschedule
}) {
  const actions = [['planned', 'Вернуть в план', 'btn-blue'], ['cancelled_by_student', 'Отменил ученик', 'btn-white'], ['cancelled_by_tutor', 'Отменил репетитор', 'btn-white'], ['rescheduled', 'Перенесён', 'btn-white'], ['no_show', 'Неявка: списать оплату', 'btn-red']];
  return _jsxs(Modal, {
    title: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0443\u0440\u043E\u043A\u0430",
    onClose: onClose,
    children: [_jsxs("div", {
      style: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12
      },
      children: [fmtDate(lesson.date), " \u0432 ", lesson.time]
    }), _jsxs("div", {
      style: {
        display: 'grid',
        gap: 8
      },
      children: [_jsx("button", {
        className: "btn btn-full btn-blue",
        onClick: () => onReschedule(lesson),
        children: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0441 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043C \u043D\u043E\u0432\u043E\u0433\u043E"
      }), actions.map(([status, label, cls]) => _jsxs("button", {
        className: `btn btn-full ${cls}`,
        onClick: () => onStatus(lesson.id, status),
        children: [lesson.status === status ? '✓ ' : '', label]
      }, status)), _jsx("button", {
        className: "btn btn-full btn-black",
        onClick: e => onDelete(lesson.id, e),
        children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u043D\u044F\u0442\u0438\u0435"
      })]
    })]
  });
}
function StudentDetailModal({
  student,
  lessons,
  txs,
  groups,
  students,
  onClose,
  onEdit,
  onPay,
  onLesson,
  onGroupLesson,
  onPackage,
  onMessage,
  onArchive
}) {
  const [detailTab, setDetailTab] = useState('overview');
  const ownLessons = lessons.filter(l => l.type === 'individual' ? l.targetId === student.id : groups.find(g => g.id === l.targetId)?.studentIds?.includes(student.id)).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
  const completed = ownLessons.filter(l => l.status === 'completed' || l.status === 'no_show');
  const skipped = completed.filter(l => l.attendance?.[student.id] === false || l.status === 'no_show').length;
  const attended = completed.length - skipped;
  const studentTxs = txs.filter(tx => tx.studentId === student.id);
  const plannedLessons = ownLessons.filter(l => l.status === 'planned');
  const homeworkLessons = ownLessons.filter(l => l.homework).slice(0, 12);
  const phoneClean = (student.phone || '').replace(/\s/g, '');
  const tabs = [['overview', 'Обзор'], ['lessons', `Уроки ${ownLessons.length}`], ['payments', `Оплаты ${studentTxs.length}`], ['homework', `ДЗ ${homeworkLessons.length}`], ['availability', 'Доп. расписание'], ['notes', 'Заметки']];
  const memberGroups = groups.filter(g => !g.archived && g.studentIds?.includes(student.id));
  return _jsxs(Modal, {
    title: student.name,
    onClose: onClose,
    children: [_jsxs("div", {
      className: "stat-row",
      children: [_jsxs("div", {
        className: "stat-card",
        children: [_jsx("div", {
          className: "stat-label",
          children: "\u0411\u0430\u043B\u0430\u043D\u0441"
        }), _jsx("div", {
          className: "stat-value",
          style: {
            color: student.balance < 0 ? 'var(--red)' : student.balance > 0 ? 'var(--green)' : 'var(--black)'
          },
          children: money(student.balance)
        })]
      }), _jsxs("div", {
        className: "stat-card",
        children: [_jsx("div", {
          className: "stat-label",
          children: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442"
        }), _jsx("div", {
          className: "stat-value",
          children: student.packageLessons || 0
        })]
      }), _jsxs("div", {
        className: "stat-card",
        children: [_jsx("div", {
          className: "stat-label",
          children: "\u041F\u043E\u0441\u0435\u0449\u0430\u0435\u043C\u043E\u0441\u0442\u044C"
        }), _jsxs("div", {
          className: "stat-value",
          children: [completed.length ? Math.round(attended / completed.length * 100) : 0, "%"]
        })]
      }), _jsxs("div", {
        className: "stat-card",
        children: [_jsx("div", {
          className: "stat-label",
          children: "\u0411\u0443\u0434\u0443\u0449\u0438\u0435"
        }), _jsx("div", {
          className: "stat-value",
          children: plannedLessons.length
        })]
      })]
    }), _jsxs("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        marginBottom: 14
      },
      children: [student.balance < 0 && _jsx("button", {
        className: "btn btn-green btn-full",
        onClick: () => onPay(student.id),
        children: "\u041E\u043F\u043B\u0430\u0442\u0438\u043B \u0434\u043E\u043B\u0433"
      }), _jsx("button", {
        className: "btn btn-black btn-full",
        onClick: () => onLesson(student.id),
        children: "\u0423\u0440\u043E\u043A"
      }), _jsx("button", {
        className: "btn btn-blue btn-full",
        onClick: () => onPackage(student),
        children: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442"
      }), _jsx("button", {
        className: "btn btn-white btn-full",
        onClick: () => onMessage(student),
        children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"
      }), student.tgId && _jsxs("button", {
        className: "btn btn-blue btn-full",
        onClick: () => {
          const id = String(student.tgId).trim();
          window.open(id.startsWith('@') ? `https://t.me/${id.slice(1)}` : `https://t.me/${id}`, '_blank');
        },
        children: [_jsx(IcoTg, {
          size: 14
        }), " Telegram"]
      }), _jsx("button", {
        className: "btn btn-white btn-full",
        onClick: onEdit,
        children: "\u041F\u0440\u0430\u0432\u0438\u0442\u044C"
      }), _jsx("button", {
        className: `btn btn-full ${student.archived ? 'btn-green' : 'btn-white'}`,
        onClick: () => onArchive(student.id, !student.archived),
        children: student.archived ? 'Вернуть' : 'В архив'
      }), student.phone && _jsx("button", {
        className: "btn btn-white btn-full",
        onClick: () => {
          window.location.href = `tel:${phoneClean}`;
        },
        children: "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C"
      })]
    }), _jsx("div", {
      className: "detail-tabs",
      children: tabs.map(([id, label]) => _jsx("button", {
        className: `detail-tab ${detailTab === id ? 'active' : ''}`,
        onClick: () => setDetailTab(id),
        children: label
      }, id))
    }), detailTab === 'overview' && _jsxs(_Fragment, {
      children: [_jsxs("div", {
        className: "card",
        style: {
          padding: 12
        },
        children: [_jsx("div", {
          className: "label",
          children: "\u0421\u0432\u043E\u0434\u043A\u0430"
        }), _jsxs("div", {
          style: {
            fontSize: 12,
            lineHeight: 1.8
          },
          children: ["\u0421\u0442\u0430\u0432\u043A\u0430: ", _jsx("strong", {
            children: money(student.rate)
          }), _jsx("br", {}), "\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B: ", _jsx("strong", {
            children: (student.subjects || ['История']).join(', ')
          }), _jsx("br", {}), "\u0423\u0440\u043E\u043A\u043E\u0432: ", _jsx("strong", {
            children: ownLessons.length
          }), " \xB7 \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u043E ", _jsx("strong", {
            children: completed.length
          }), " \xB7 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u043E\u0432 ", _jsx("strong", {
            children: skipped
          }), _jsx("br", {}), student.goal && _jsxs(_Fragment, {
            children: ["\u0426\u0435\u043B\u044C: ", _jsx("strong", {
              children: student.goal
            }), _jsx("br", {})]
          }), student.notes && _jsxs(_Fragment, {
            children: ["\u0417\u0430\u043C\u0435\u0442\u043A\u0438: ", student.notes]
          })]
        })]
      }), getStudentLastHomework(student.id, lessons, groups) && _jsxs("div", {
        className: "card",
        style: {
          padding: 12
        },
        children: [_jsx("div", {
          className: "label",
          children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0434\u043E\u043C\u0430\u0448\u043A\u0430"
        }), _jsx("div", {
          style: {
            fontSize: 12,
            lineHeight: 1.6
          },
          children: getStudentLastHomework(student.id, lessons, groups)
        })]
      }), (() => {
        const ratedLessons = ownLessons.filter(l => l.status === 'completed' && l.rating > 0).slice(0, 12);
        if (ratedLessons.length < 2) return null;
        const avg = ratedLessons.reduce((s, l) => s + l.rating, 0) / ratedLessons.length;
        return _jsxs("div", {
          className: "card",
          style: {
            padding: 12
          },
          children: [_jsxs("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 11,
              fontWeight: 900,
              marginBottom: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            },
            children: [_jsx("span", {
              children: "\u041F\u0420\u041E\u0413\u0420\u0415\u0421\u0421"
            }), _jsxs("span", {
              style: {
                color: 'var(--text-sec)',
                fontSize: 10
              },
              children: ["\u0441\u0440. ", avg.toFixed(1), " / 5"]
            })]
          }), _jsx("div", {
            style: {
              display: 'flex',
              alignItems: 'flex-end',
              gap: 4,
              height: 50
            },
            children: ratedLessons.slice().reverse().map(l => _jsxs("div", {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              },
              children: [_jsx("div", {
                style: {
                  width: '100%',
                  background: l.rating >= 4 ? 'var(--green)' : l.rating >= 3 ? '#FF8C00' : 'var(--red)',
                  borderRadius: '3px 3px 0 0',
                  height: `${l.rating / 5 * 44}px`
                }
              }), _jsx("span", {
                style: {
                  fontSize: 8,
                  color: 'var(--text-muted)',
                  fontFamily: 'Martian Mono,monospace'
                },
                children: new Date(l.date + 'T00:00:00').toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'numeric'
                })
              })]
            }, l.id))
          })]
        });
      })()]
    }), detailTab === 'lessons' && _jsx(_Fragment, {
      children: ownLessons.length === 0 ? _jsx(EmptyState, {
        title: "\u0423\u0440\u043E\u043A\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
        text: "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0443\u0440\u043E\u043A \u043F\u0440\u044F\u043C\u043E \u0438\u0437 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430.",
        action: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0443\u0440\u043E\u043A",
        onAction: () => onLesson(student.id)
      }) : ownLessons.slice(0, 30).map(l => _jsxs("div", {
        className: "crm-table-row",
        children: [_jsxs("div", {
          children: [_jsxs("div", {
            style: {
              fontWeight: 800,
              fontSize: 12
            },
            children: [fmtDate(l.date), " \xB7 ", l.time, " \xB7 ", l.subject || 'История']
          }), _jsxs("div", {
            style: {
              fontSize: 11,
              color: 'var(--text-sec)'
            },
            children: [l.type === 'group' ? groups.find(g => g.id === l.targetId)?.name : 'Индивидуально', " \xB7 ", LESSON_STATUS[l.status]?.label || l.status]
          })]
        }), l.homework && _jsx("span", {
          className: "badge badge-green",
          children: "\u0414\u0417"
        })]
      }, l.id))
    }), detailTab === 'payments' && _jsx(_Fragment, {
      children: studentTxs.length === 0 ? _jsx(EmptyState, {
        title: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
        text: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043E\u043F\u043B\u0430\u0442\u044B \u0438\u043B\u0438 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F, \u043E\u043D\u0438 \u0431\u0443\u0434\u0443\u0442 \u0437\u0434\u0435\u0441\u044C.",
        action: student.balance < 0 ? 'Оплатил долг' : 'Добавить абонемент',
        onAction: () => student.balance < 0 ? onPay(student.id) : onPackage(student)
      }) : studentTxs.slice(0, 30).map(tx => _jsxs("div", {
        className: "crm-table-row",
        children: [_jsxs("div", {
          children: [_jsxs("div", {
            style: {
              fontWeight: 800,
              fontSize: 12
            },
            children: [fmtDate(tx.date), " \xB7 ", tx.comment || (tx.type === 'payment' ? 'Оплата' : 'Списание')]
          }), _jsx("div", {
            style: {
              fontSize: 11,
              color: 'var(--text-sec)'
            },
            children: tx.type === 'payment' ? 'Поступление' : 'Списание'
          })]
        }), _jsxs("strong", {
          style: {
            color: tx.type === 'payment' ? 'var(--green)' : 'var(--red)'
          },
          children: [tx.type === 'payment' ? '+' : '-', money(tx.amount)]
        })]
      }, tx.id))
    }), detailTab === 'homework' && _jsx(_Fragment, {
      children: homeworkLessons.length === 0 ? _jsx(EmptyState, {
        title: "\u0414\u043E\u043C\u0430\u0448\u0435\u043A \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
        text: "\u041F\u043E\u0441\u043B\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0443\u0440\u043E\u043A\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435, \u0438 \u043E\u043D\u043E \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0443\u0447\u0435\u043D\u0438\u043A\u0430.",
        action: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0443",
        onAction: () => onMessage(student)
      }) : homeworkLessons.map(l => _jsxs("div", {
        className: "card",
        style: {
          padding: 12
        },
        children: [_jsxs("div", {
          className: "label",
          children: [fmtDate(l.date), " \xB7 ", l.time]
        }), _jsx("div", {
          style: {
            fontSize: 12,
            lineHeight: 1.6
          },
          children: l.homework
        })]
      }, l.id))
    }), detailTab === 'availability' && _jsxs(_Fragment, {
      children: [_jsxs("div", {
        className: "card",
        style: {
          padding: 12
        },
        children: [_jsx("div", {
          className: "label",
          children: "\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0435 \u043E\u043A\u043D\u0430 \u0443\u0447\u0435\u043D\u0438\u043A\u0430"
        }), _jsx("div", {
          style: {
            whiteSpace: 'pre-wrap',
            fontSize: 12,
            lineHeight: 1.7,
            color: student.availabilityNotes ? 'var(--black)' : 'var(--text-muted)'
          },
          children: student.availabilityNotes || 'Заполните доп. расписание в редакторе ученика: например, Пн 15:00-18:00.'
        })]
      }), memberGroups.length === 0 ? _jsx(EmptyState, {
        title: "\u0413\u0440\u0443\u043F\u043F \u0443 \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u043D\u0435\u0442",
        text: "\u041A\u043E\u0433\u0434\u0430 \u0443\u0447\u0435\u043D\u0438\u043A \u0431\u0443\u0434\u0435\u0442 \u0432 \u0433\u0440\u0443\u043F\u043F\u0435, \u0437\u0434\u0435\u0441\u044C \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043E\u0431\u0449\u0438\u0435 \u043E\u043A\u043D\u0430 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0430."
      }) : memberGroups.map(g => {
        const members = g.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean);
        const slots = commonAvailability(members);
        return _jsxs("div", {
          className: "card",
          style: {
            padding: 12
          },
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 12,
              fontWeight: 900,
              marginBottom: 6
            },
            children: g.name
          }), slots.length ? _jsx("div", {
            style: {
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap'
            },
            children: slots.map(slot => _jsx("button", {
              className: "btn btn-sm btn-white",
              onClick: () => onGroupLesson(g, nextDateForDow(slot.day), minToTime(slot.start)),
              children: `${DAY_FULL[slot.day]} ${minToTime(slot.start)}-${minToTime(slot.end)}`
            }, `${g.id}-${slot.day}-${slot.start}`))
          }) : _jsx("div", {
            style: {
              fontSize: 12,
              color: 'var(--text-sec)',
              lineHeight: 1.6
            },
            children: "\u041E\u0431\u0449\u0435 \u043E\u043A\u043D\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0434\u043E\u043F. \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0443 \u0432\u0441\u0435\u0445 \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432 \u0433\u0440\u0443\u043F\u043F\u044B."
          })]
        }, g.id);
      })]
    }), detailTab === 'notes' && _jsxs("div", {
      className: "card",
      style: {
        padding: 12
      },
      children: [_jsx("div", {
        className: "label",
        children: "\u0426\u0435\u043B\u044C"
      }), _jsx("div", {
        style: {
          fontSize: 12,
          lineHeight: 1.7,
          marginBottom: 12
        },
        children: student.goal || 'Цель не указана'
      }), _jsx("div", {
        className: "label",
        children: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438"
      }), _jsx("div", {
        style: {
          fontSize: 12,
          lineHeight: 1.7,
          marginBottom: 12
        },
        children: student.notes || 'Заметок пока нет'
      }), _jsx("div", {
        className: "label",
        children: "\u0421\u0442\u0430\u0432\u043A\u0438 \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430\u043C"
      }), _jsx("div", {
        style: {
          fontSize: 12,
          lineHeight: 1.8
        },
        children: Object.keys(student.lessonRates || {}).length ? Object.entries(student.lessonRates).map(([subject, rate]) => _jsxs("div", {
          children: [subject, ": ", _jsx("strong", {
            children: money(rate)
          })]
        }, subject)) : 'Используется базовая ставка'
      }), _jsx("button", {
        className: "btn btn-black btn-full",
        style: {
          marginTop: 12
        },
        onClick: onEdit,
        children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0438"
      })]
    })]
  });
}
function PackageModal({
  student,
  onClose,
  onSave
}) {
  const [lessonsCount, setLessonsCount] = useState(4);
  const [amount, setAmount] = useState(student.rate * 4);
  const submit = e => {
    e.preventDefault();
    onSave(student.id, Number(lessonsCount), Number(amount));
  };
  return _jsx(Modal, {
    title: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442",
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsxs("div", {
        className: "card",
        style: {
          padding: 12
        },
        children: [_jsx("div", {
          className: "label",
          children: "\u0423\u0447\u0435\u043D\u0438\u043A"
        }), _jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontWeight: 900
          },
          children: student.name
        }), _jsxs("div", {
          style: {
            fontSize: 11,
            color: '#666',
            marginTop: 4
          },
          children: ["\u0421\u0435\u0439\u0447\u0430\u0441 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: ", student.packageLessons || 0, " \u0437\u0430\u043D."]
        })]
      }), _jsx(FormField, {
        label: "\u0417\u0430\u043D\u044F\u0442\u0438\u0439 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
        children: _jsx("select", {
          className: "input",
          value: lessonsCount,
          onChange: e => {
            const n = Number(e.target.value);
            setLessonsCount(n);
            setAmount(student.rate * n);
          },
          children: [1, 2, 4, 6, 8, 10, 12].map(n => _jsxs("option", {
            value: n,
            children: [n, " \u0437\u0430\u043D."]
          }, n))
        })
      }), _jsx(FormField, {
        label: "\u041E\u043F\u043B\u0430\u0442\u0430 \u20BD",
        children: _jsx("input", {
          className: "input",
          type: "number",
          min: "0",
          value: amount,
          onChange: e => setAmount(e.target.value)
        })
      }), _jsx("div", {
        className: "empty-state",
        style: {
          padding: 12,
          textAlign: 'left'
        },
        children: _jsx("div", {
          style: {
            fontSize: 12,
            color: 'var(--text-sec)',
            lineHeight: 1.6
          },
          children: "\u041E\u043F\u043B\u0430\u0442\u0430 \u0430\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u0430 \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0434\u043E\u0445\u043E\u0434\u043E\u0432, \u043D\u043E \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u0441\u0447\u0438\u0442\u0430\u0442\u044C\u0441\u044F \u043F\u0435\u0440\u0435\u043F\u043B\u0430\u0442\u043E\u0439 \u043D\u0430 \u0431\u0430\u043B\u0430\u043D\u0441\u0435. \u0411\u0430\u043B\u0430\u043D\u0441 \u043F\u043E\u043A\u0430\u0436\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u043B\u0433\u0438 \u0438\u043B\u0438 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0439 \u0430\u0432\u0430\u043D\u0441."
        })
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: "btn btn-green btn-full",
          children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"
        })]
      })]
    })
  });
}
function RescheduleModal({
  lesson,
  onClose,
  onSave
}) {
  const [date, setDate] = useState(lesson.date);
  const [time, setTime] = useState(lesson.time);
  const submit = e => {
    e.preventDefault();
    onSave(lesson.id, date, time);
  };
  return _jsx(Modal, {
    title: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0443\u0440\u043E\u043A",
    onClose: onClose,
    children: _jsxs("form", {
      onSubmit: submit,
      children: [_jsxs("div", {
        style: {
          fontSize: 12,
          color: '#666',
          marginBottom: 12
        },
        children: ["\u0421\u0442\u0430\u0440\u044B\u0439 \u0443\u0440\u043E\u043A: ", fmtDate(lesson.date), " \u0432 ", lesson.time]
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10
        },
        children: [_jsx(FormField, {
          label: "\u041D\u043E\u0432\u0430\u044F \u0434\u0430\u0442\u0430",
          children: _jsx("input", {
            className: "input",
            type: "date",
            required: true,
            value: date,
            onChange: e => setDate(e.target.value)
          })
        }), _jsx(FormField, {
          label: "\u041D\u043E\u0432\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
          children: _jsx("input", {
            className: "input",
            type: "time",
            required: true,
            value: time,
            onChange: e => setTime(e.target.value)
          })
        })]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          gap: 10
        },
        children: [_jsx("button", {
          type: "button",
          className: "btn btn-white btn-full",
          onClick: onClose,
          children: "\u041E\u0442\u043C\u0435\u043D\u0430"
        }), _jsx("button", {
          type: "submit",
          className: "btn btn-blue btn-full",
          children: "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438"
        })]
      })]
    })
  });
}
function MessageModal({
  student,
  lesson,
  groups,
  lessons,
  templates,
  onClose,
  onSaveTemplate
}) {
  const allTemplates = [...DEFAULT_TEMPLATES, ...(templates || [])];
  const [selId, setSelId] = useState(allTemplates[0]?.id || '');
  const [editMode, setEditMode] = useState(false); // manage custom templates
  const [customText, setCustomText] = useState('');
  const [editingTpl, setEditingTpl] = useState(null); // {id,name,body} | 'new'
  const [newName, setNewName] = useState('');
  const [newBody, setNewBody] = useState('');
  const [copied, setCopied] = useState(false);
  const targetLesson = lesson || getStudentLessons(student.id, lessons, groups).filter(l => l.status === 'planned').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0];
  const lastHomework = getStudentLastHomework(student.id, lessons, groups);
  const selectedTpl = allTemplates.find(t => t.id === selId);
  const generatedText = selectedTpl ? renderTemplate(selectedTpl.body, student, targetLesson, lastHomework) : '';
  const text = customText || generatedText;

  // When template changes, reset custom override
  const pickTemplate = id => {
    setSelId(id);
    setCustomText('');
    setCopied(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const a = document.createElement('textarea');
      a.value = text;
      document.body.appendChild(a);
      a.select();
      document.execCommand('copy');
      a.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const openTg = async () => {
    if (!student.tgId) return;
    // Copy text to clipboard before opening TG
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const a = document.createElement('textarea');
      a.value = text;
      document.body.appendChild(a);
      a.select();
      document.execCommand('copy');
      a.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const id = String(student.tgId).trim();
    window.open(id.startsWith('@') ? `https://t.me/${id.slice(1)}` : `https://t.me/${id}`, '_blank');
  };
  if (editMode) {
    const customTemplates = templates || [];
    return _jsxs(Modal, {
      title: "\u041C\u043E\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u044B",
      onClose: () => setEditMode(false),
      children: [_jsxs("div", {
        style: {
          fontSize: 11,
          color: '#666',
          marginBottom: 12
        },
        children: ["\u041F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B: ", _jsx("code", {
          children: '{name}'
        }), " ", _jsx("code", {
          children: '{lessonDate}'
        }), " ", _jsx("code", {
          children: '{balance}'
        }), " ", _jsx("code", {
          children: '{homework}'
        })]
      }), editingTpl ? _jsxs("div", {
        children: [_jsx(FormField, {
          label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430",
          children: _jsx("input", {
            className: "input",
            value: newName,
            onChange: e => setNewName(e.target.value),
            placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041E\u043F\u043E\u0437\u0434\u0430\u043D\u0438\u0435"
          })
        }), _jsx(FormField, {
          label: "\u0422\u0435\u043A\u0441\u0442",
          children: _jsx("textarea", {
            className: "input",
            value: newBody,
            onChange: e => setNewBody(e.target.value),
            style: {
              minHeight: 100,
              resize: 'vertical'
            },
            placeholder: "\u041F\u0440\u0438\u0432\u0435\u0442, {name}! ..."
          })
        }), _jsxs("div", {
          style: {
            display: 'flex',
            gap: 8
          },
          children: [_jsx("button", {
            className: "btn btn-white btn-full",
            onClick: () => {
              setEditingTpl(null);
              setNewName('');
              setNewBody('');
            },
            children: "\u041E\u0442\u043C\u0435\u043D\u0430"
          }), _jsx("button", {
            className: "btn btn-black btn-full",
            onClick: () => {
              if (!newName.trim() || !newBody.trim()) return;
              if (editingTpl === 'new') {
                onSaveTemplate([...customTemplates, {
                  id: 'custom_' + Date.now(),
                  name: newName,
                  body: newBody
                }]);
              } else {
                onSaveTemplate(customTemplates.map(t => t.id === editingTpl.id ? {
                  ...t,
                  name: newName,
                  body: newBody
                } : t));
              }
              setEditingTpl(null);
              setNewName('');
              setNewBody('');
            },
            children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"
          })]
        })]
      }) : _jsxs(_Fragment, {
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 10,
            fontWeight: 900,
            marginBottom: 8,
            color: '#666'
          },
          children: "\u0412\u0421\u0422\u0420\u041E\u0415\u041D\u041D\u042B\u0415"
        }), DEFAULT_TEMPLATES.map(t => _jsxs("div", {
          style: {
            padding: '8px 0',
            borderBottom: '1px solid #ddd',
            fontSize: 11
          },
          children: [_jsx("div", {
            style: {
              fontWeight: 700,
              marginBottom: 2
            },
            children: t.name
          }), _jsx("div", {
            style: {
              color: '#666',
              fontSize: 10
            },
            children: t.body
          })]
        }, t.id)), _jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 10,
            fontWeight: 900,
            margin: '14px 0 8px',
            color: '#666'
          },
          children: "\u041C\u041E\u0418 \u0428\u0410\u0411\u041B\u041E\u041D\u042B"
        }), customTemplates.length === 0 && _jsx("div", {
          style: {
            fontSize: 11,
            color: '#888',
            marginBottom: 12
          },
          children: "\u041D\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432"
        }), customTemplates.map(t => _jsxs("div", {
          style: {
            padding: '8px 0',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 8
          },
          children: [_jsxs("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [_jsx("div", {
              style: {
                fontWeight: 700,
                fontSize: 11
              },
              children: t.name
            }), _jsx("div", {
              style: {
                color: '#666',
                fontSize: 10,
                marginTop: 2
              },
              children: t.body
            })]
          }), _jsxs("div", {
            style: {
              display: 'flex',
              gap: 4,
              flexShrink: 0
            },
            children: [_jsx("button", {
              className: "btn btn-sm btn-white",
              title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
              style: {
                padding: '4px 8px'
              },
              onClick: () => {
                setEditingTpl(t);
                setNewName(t.name);
                setNewBody(t.body);
              },
              children: _jsx(IcoEdit, {
                size: 13
              })
            }), _jsx("button", {
              className: "btn btn-sm btn-red",
              title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
              style: {
                padding: '4px 8px'
              },
              onClick: () => onSaveTemplate(customTemplates.filter(x => x.id !== t.id)),
              children: _jsx(IcoTrash, {
                size: 13
              })
            })]
          })]
        }, t.id)), _jsx("div", {
          style: {
            marginTop: 12,
            display: 'flex',
            gap: 8
          },
          children: _jsx("button", {
            className: "btn btn-black btn-full",
            onClick: () => {
              setEditingTpl('new');
              setNewName('');
              setNewBody('');
            },
            children: "+ \u041D\u043E\u0432\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D"
          })
        })]
      })]
    });
  }
  return _jsxs(Modal, {
    title: `Сообщение · ${student.name}`,
    onClose: onClose,
    children: [_jsxs("div", {
      style: {
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        marginBottom: 12
      },
      children: [allTemplates.map(t => _jsx("button", {
        className: `btn btn-sm ${selId === t.id ? 'btn-black' : 'btn-white'}`,
        style: {
          padding: '5px 10px',
          fontSize: 9
        },
        onClick: () => pickTemplate(t.id),
        children: t.name
      }, t.id)), _jsxs("button", {
        className: "btn btn-sm btn-white",
        style: {
          padding: '5px 10px',
          fontSize: 9,
          marginLeft: 'auto'
        },
        onClick: () => setEditMode(true),
        children: [_jsx(IcoEdit, {
          size: 13
        }), " \u0428\u0430\u0431\u043B\u043E\u043D\u044B"]
      })]
    }), _jsx(FormField, {
      label: "\u0422\u0435\u043A\u0441\u0442",
      children: _jsx("textarea", {
        className: "input",
        value: customText || generatedText,
        onChange: e => setCustomText(e.target.value),
        style: {
          minHeight: 120,
          resize: 'vertical'
        }
      })
    }), customText && customText !== generatedText && _jsx("button", {
      style: {
        background: 'none',
        border: 'none',
        fontSize: 10,
        color: '#666',
        cursor: 'pointer',
        marginBottom: 8,
        padding: 0
      },
      onClick: () => setCustomText(''),
      children: "\u2190 \u0412\u0435\u0440\u043D\u0443\u0442\u044C \u0438\u0437 \u0448\u0430\u0431\u043B\u043E\u043D\u0430"
    }), _jsxs("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 4
      },
      children: [_jsx("button", {
        className: `btn btn-full ${copied ? 'btn-green' : 'btn-black'}`,
        onClick: copy,
        style: {
          flex: 2
        },
        children: copied ? '✓ Скопировано' : 'Скопировать'
      }), student.tgId && _jsxs("button", {
        className: "btn btn-blue btn-full",
        onClick: openTg,
        style: {
          flex: 1,
          gap: 4
        },
        children: [_jsx(IcoTg, {
          size: 14
        }), " TG"]
      })]
    })]
  });
}

// ── GROUP DETAIL MODAL ──────────────────────────────────────────────────────────
function GroupDetailModal({
  group,
  students,
  lessons,
  onClose,
  onEdit
}) {
  const members = group.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean);
  const groupLessons = lessons.filter(l => l.type === 'group' && l.targetId === group.id);
  const upcoming = groupLessons.filter(l => l.status === 'planned').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 5);
  const completedCount = groupLessons.filter(l => l.status === 'completed').length;
  return _jsxs(Modal, {
    title: `${group.emoji ? group.emoji + ' ' : ''}${group.name}`,
    onClose: onClose,
    children: [_jsxs("div", {
      style: {
        marginBottom: 12,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      children: [_jsx("span", {
        className: "lesson-tag",
        style: {
          background: subjectColor(group.subject || 'История'),
          color: subjectTagText(group.subject || 'История')
        },
        children: group.subject || 'История'
      }), _jsxs("span", {
        style: {
          fontSize: 11,
          color: '#666'
        },
        children: [completedCount, " \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u043E \xB7 ", upcoming.length, " \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E"]
      }), group.archived && _jsx("span", {
        className: "badge badge-yellow",
        children: "\u0410\u0420\u0425\u0418\u0412"
      })]
    }), _jsxs("div", {
      style: {
        fontFamily: 'Unbounded,cursive',
        fontSize: 11,
        fontWeight: 900,
        marginBottom: 8
      },
      children: ["\u0423\u0427\u0415\u041D\u0418\u041A\u0418 (", members.length, ")"]
    }), members.map(s => _jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
        fontSize: 12
      },
      children: [_jsx("span", {
        style: {
          fontWeight: 700
        },
        children: s.name
      }), _jsxs("span", {
        style: {
          color: '#666',
          fontFamily: 'Unbounded,cursive',
          fontSize: 10
        },
        children: [group.rateOverrides?.[s.id] !== undefined ? _jsxs(_Fragment, {
          children: [_jsx("s", {
            style: {
              opacity: .5
            },
            children: money(s.rate)
          }), " ", money(group.rateOverrides[s.id])]
        }) : money(s.rate), "/\u0443\u0440\u043E\u043A"]
      })]
    }, s.id)), _jsx("div", {
      style: {
        fontFamily: 'Unbounded,cursive',
        fontSize: 11,
        fontWeight: 900,
        margin: '14px 0 8px'
      },
      children: "\u0411\u041B\u0418\u0416\u0410\u0419\u0428\u0418\u0415 \u0423\u0420\u041E\u041A\u0418"
    }), upcoming.length === 0 ? _jsx("div", {
      style: {
        fontSize: 11,
        color: '#888'
      },
      children: "\u041D\u0435\u0442 \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0443\u0440\u043E\u043A\u043E\u0432"
    }) : upcoming.map(l => _jsxs("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
        fontSize: 11
      },
      children: [_jsx("span", {
        children: fmtDate(l.date)
      }), _jsx("span", {
        style: {
          fontWeight: 700
        },
        children: l.time
      })]
    }, l.id)), _jsxs("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginTop: 16
      },
      children: [_jsx("button", {
        className: "btn btn-white btn-full",
        onClick: onClose,
        children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C"
      }), _jsx("button", {
        className: "btn btn-black btn-full",
        onClick: onEdit,
        children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
      })]
    })]
  });
}
function DeleteJournalModal({
  entries,
  onRestore,
  onClose
}) {
  return _jsx(Modal, {
    title: "\u0416\u0443\u0440\u043D\u0430\u043B \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0439",
    onClose: onClose,
    children: entries.length === 0 ? _jsx(EmptyState, {
      title: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
      text: "\u0412 \u044D\u0442\u043E\u0439 \u0441\u0435\u0441\u0441\u0438\u0438 \u0441\u044E\u0434\u0430 \u043F\u043E\u043F\u0430\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0451\u043D\u043D\u044B\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438, \u0433\u0440\u0443\u043F\u043F\u044B, \u0437\u0430\u043D\u044F\u0442\u0438\u044F \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438. \u0418\u0445 \u043C\u043E\u0436\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0431\u0435\u0437 \u043F\u043E\u0438\u0441\u043A\u0430 \u043F\u043E \u0431\u044D\u043A\u0430\u043F\u0430\u043C."
    }) : _jsxs(_Fragment, {
      children: [_jsx("div", {
        style: {
          fontSize: 12,
          color: 'var(--text-sec)',
          lineHeight: 1.6,
          marginBottom: 12
        },
        children: "\u0416\u0443\u0440\u043D\u0430\u043B \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F. \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0430 \u043C\u043E\u043C\u0435\u043D\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F."
      }), entries.map(entry => _jsxs("div", {
        className: "crm-table-row",
        children: [_jsxs("div", {
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 12,
              fontWeight: 900
            },
            children: entry.label
          }), _jsxs("div", {
            style: {
              fontSize: 11,
              color: 'var(--text-sec)'
            },
            children: ["\u0423\u0434\u0430\u043B\u0435\u043D\u043E \u0432 ", entry.createdAt]
          })]
        }), _jsx("button", {
          className: "btn btn-sm btn-green",
          onClick: () => onRestore(entry),
          children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C"
        })]
      }, entry.id))]
    })
  });
}

// ── SCHEDULE EXPORT MODAL ───────────────────────────────────────────────────────
function ScheduleExportModal({
  lessons,
  onExport,
  onClose
}) {
  const today = getTodayDate();
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const presets = [{
    label: 'Эта неделя',
    fn: () => {
      const d = new Date();
      const dow = d.getDay() || 7;
      const mon = new Date(d);
      mon.setDate(d.getDate() - dow + 1);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      setFrom(mon.toISOString().slice(0, 10));
      setTo(sun.toISOString().slice(0, 10));
    }
  }, {
    label: 'Этот месяц',
    fn: () => {
      const d = new Date();
      setFrom(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`);
      const last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      setTo(last.toISOString().slice(0, 10));
    }
  }, {
    label: 'Прошлый месяц',
    fn: () => {
      const d = new Date();
      const y = d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear();
      const m = d.getMonth() === 0 ? 12 : d.getMonth();
      setFrom(`${y}-${String(m).padStart(2, '0')}-01`);
      const last = new Date(y, m, 0);
      setTo(last.toISOString().slice(0, 10));
    }
  }];
  const count = lessons.filter(l => l.date >= from && l.date <= to).length;
  return _jsxs(Modal, {
    title: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F",
    onClose: onClose,
    children: [_jsx("div", {
      style: {
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        marginBottom: 14
      },
      children: presets.map(p => _jsx("button", {
        className: "btn btn-sm btn-white",
        style: {
          padding: '6px 10px',
          fontSize: 10
        },
        onClick: p.fn,
        children: p.label
      }, p.label))
    }), _jsxs("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      },
      children: [_jsx(FormField, {
        label: "\u0421",
        children: _jsx("input", {
          className: "input",
          type: "date",
          value: from,
          onChange: e => setFrom(e.target.value)
        })
      }), _jsx(FormField, {
        label: "\u041F\u043E",
        children: _jsx("input", {
          className: "input",
          type: "date",
          value: to,
          onChange: e => setTo(e.target.value)
        })
      })]
    }), _jsxs("div", {
      style: {
        fontSize: 11,
        color: '#666',
        margin: '8px 0 14px',
        textAlign: 'center'
      },
      children: [count, " \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u0432 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C \u043F\u0435\u0440\u0438\u043E\u0434\u0435"]
    }), _jsxs("div", {
      style: {
        display: 'flex',
        gap: 10
      },
      children: [_jsx("button", {
        className: "btn btn-white btn-full",
        onClick: onClose,
        children: "\u041E\u0442\u043C\u0435\u043D\u0430"
      }), _jsxs("button", {
        className: "btn btn-black btn-full",
        disabled: !count,
        onClick: () => {
          onExport(from, to);
          onClose();
        },
        children: [_jsx(IcoPrint, {
          size: 14
        }), " \u041F\u0435\u0447\u0430\u0442\u044C / PDF"]
      })]
    })]
  });
}

// ── TIPS MODAL ─────────────────────────────────────────────────────────────────
const TIPS = [{
  icon: '💡',
  title: 'Серии уроков',
  text: 'При создании урока включи "Серия" — приложение автоматически создаст повторяющиеся уроки на несколько недель вперёд. Не нужно добавлять каждый урок вручную.'
}, {
  icon: '⚡',
  title: 'Быстрое закрытие дня',
  text: 'На главном экране кнопка "Закрыть N" сразу отмечает все прошедшие уроки как проведённые с полной посещаемостью. 2 секунды вместо 5 минут.'
}, {
  icon: '💸',
  title: 'Абонементы',
  text: 'Абонемент списывает уроки с пакета, а не с баланса. Удобно когда ученик платит сразу за месяц — не нужно следить за суммами.'
}, {
  icon: '📊',
  title: 'Долги на главной',
  text: 'Раздел "Требует внимания" показывает всех должников прямо на главном экране. Оттуда же можно отправить напоминание.'
}, {
  icon: '📱',
  title: 'Telegram-чат одним нажатием',
  text: 'Заполни Telegram ID или @username в профиле ученика — кнопка "Написать" станет синей и откроет чат напрямую без копирования номера.'
}, {
  icon: '🎨',
  title: 'Смайлы для групп',
  text: 'Добавь смайл группе (🏛️ 📚 🔢 🌍) — так группы мгновенно различаются в списке, особенно если их много.'
}, {
  icon: '💰',
  title: 'Разные ставки',
  text: 'В профиле ученика можно задать разные ставки для разных предметов. Например: история 1500 ₽, обществознание 1200 ₽.'
}, {
  icon: '📅',
  title: 'Экспорт расписания',
  text: 'Кнопка PDF в расписании выгружает таблицу за любой период. Удобно сохранить на месяц или отправить родителям.'
}, {
  icon: '🔍',
  title: 'Фильтр по предметам',
  text: 'В расписании и списке учеников есть фильтр по предмету — удобно когда ведёшь несколько дисциплин.'
}, {
  icon: '✏️',
  title: 'Свои шаблоны сообщений',
  text: 'В окне "Написать" → "⚙ Шаблоны" можно создавать свои тексты с плейсхолдерами {name}, {lessonDate}, {balance}.'
}];
function TipsModal({
  onClose
}) {
  const [idx, setIdx] = useState(0);
  const tip = TIPS[idx];
  return _jsxs(Modal, {
    title: "\u0421\u043E\u0432\u0435\u0442\u044B",
    onClose: onClose,
    children: [_jsxs("div", {
      style: {
        textAlign: 'center',
        padding: '8px 0 20px'
      },
      children: [_jsx("div", {
        style: {
          width: 56,
          height: 56,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'var(--border)',
          borderRadius: 12,
          background: 'var(--bg-subtle)',
          marginBottom: 12
        },
        children: _jsx(IcoLightbulb, {
          size: 30
        })
      }), _jsx("div", {
        style: {
          fontFamily: 'Unbounded,cursive',
          fontWeight: 900,
          fontSize: 14,
          marginBottom: 12,
          lineHeight: 1.4
        },
        children: tip.title
      }), _jsx("div", {
        style: {
          fontSize: 12,
          lineHeight: 1.7,
          color: 'var(--black)',
          opacity: .8
        },
        children: tip.text
      })]
    }), _jsx("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12
      },
      children: TIPS.map((_, i) => _jsx("div", {
        onClick: () => setIdx(i),
        style: {
          flex: 1,
          height: 4,
          borderRadius: 2,
          cursor: 'pointer',
          background: i === idx ? 'var(--black)' : '#ddd',
          transition: 'background .2s'
        }
      }, i))
    }), _jsxs("div", {
      style: {
        display: 'flex',
        gap: 8
      },
      children: [_jsx("button", {
        className: "btn btn-white btn-full",
        disabled: idx === 0,
        onClick: () => setIdx(i => i - 1),
        children: "\u2190 \u041D\u0430\u0437\u0430\u0434"
      }), idx < TIPS.length - 1 ? _jsx("button", {
        className: "btn btn-black btn-full",
        onClick: () => setIdx(i => i + 1),
        children: "\u0412\u043F\u0435\u0440\u0451\u0434 \u2192"
      }) : _jsx("button", {
        className: "btn btn-black btn-full",
        onClick: onClose,
        children: "\u0413\u043E\u0442\u043E\u0432\u043E \u2713"
      })]
    })]
  });
}

// ── MAIN APP ───────────────────────────────────────────────────────────────────
function App() {
  const [tab, setTab] = useState('today');
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [txs, setTxs] = useState([]);
  const [settings, setSettings] = useState({
    theme: 'light'
  });
  const [loaded, setLoaded] = useState(false);

  // selected date for schedule tab
  const [selDate, setSelDate] = useState(getTodayDate());

  // modals
  const [modal, setModal] = useState(null); // { type, payload }

  // ── Hoisted page state (survives modal open/close) ──
  const [studentsView, setStudentsView] = useState('students');
  const [studentsQ, setStudentsQ] = useState('');
  const [studentsDebtOnly, setStudentsDebtOnly] = useState(false);
  const [studentsShowArchived, setStudentsShowArchived] = useState(false);
  const [studentsSubjectFilter, setStudentsSubjectFilter] = useState('all');
  const [schedView, setSchedView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [calMonth, setCalMonth] = useState(new Date());
  const [schedSubject, setSchedSubject] = useState('all');
  const [customTemplates, setCustomTemplates] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [deletionLog, setDeletionLog] = useState([]);
  const notifications = useMemo(() => loaded ? generateNotifications(lessons, students, groups) : [], [loaded, lessons, students, groups]);

  // ── Undo system ──
  const [pendingUndo, setPendingUndo] = useState(null);
  const undoTimerRef = useRef(null);
  const triggerUndo = (label, snapL, snapS, snapT, snapG) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setPendingUndo({
      label,
      restore: () => {
        setLessons(snapL);
        setStudents(snapS);
        setTxs(snapT);
        if (snapG !== undefined) setGroups(snapG);
      }
    });
    undoTimerRef.current = setTimeout(() => setPendingUndo(null), 4000);
  };
  const handleUndo = () => {
    if (!pendingUndo) return;
    clearTimeout(undoTimerRef.current);
    pendingUndo.restore();
    setPendingUndo(null);
  };
  const recordDeletion = (label, restore) => {
    setDeletionLog(p => [{
      id: Date.now() + Math.random(),
      label,
      createdAt: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      restore
    }, ...p].slice(0, 30));
  };
  const restoreDeletion = entry => {
    entry.restore();
    setDeletionLog(p => p.filter(x => x.id !== entry.id));
    setPendingUndo(null);
  };
  useEffect(() => {
    const saved = loadSavedState();
    const initial = saved || cloneEmptyState();
    const r = runAutoCompletion(initial.lessons, initial.students, initial.groups, initial.txs || []);
    setLessons(r?.newLessons || initial.lessons);
    setStudents(r?.newStudents || initial.students);
    setGroups(initial.groups || []);
    setTxs(r?.newTransactions || initial.txs || []);
    setSettings(initial.settings || {
      theme: 'light'
    });
    // load custom templates
    try {
      const t = localStorage.getItem('tutor-templates');
      if (t) setCustomTemplates(JSON.parse(t));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    saveState({
      students,
      groups,
      lessons,
      txs,
      settings
    });
  }, [loaded, students, groups, lessons, txs, settings]);

  // Auto-backup every 5 minutes with rotation (keep last 3)
  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      try {
        const backup = JSON.stringify({
          v: STORAGE_VERSION,
          t: new Date().toISOString(),
          data: {
            students,
            groups,
            lessons,
            txs,
            settings
          }
        });
        const keys = ['tutor-backup-1', 'tutor-backup-2', 'tutor-backup-3'];
        // Rotate: 2→3, 1→2, new→1
        const b2 = localStorage.getItem(keys[1]);
        if (b2) localStorage.setItem(keys[2], b2);
        const b1 = localStorage.getItem(keys[0]);
        if (b1) localStorage.setItem(keys[1], b1);
        localStorage.setItem(keys[0], backup);
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          console.warn('localStorage full — скачайте бэкап!');
        }
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loaded, students, groups, lessons, txs, settings]);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('tutor-templates', JSON.stringify(customTemplates));
  }, [loaded, customTemplates]);
  useEffect(() => {
    document.body.dataset.theme = settings.theme || 'light';
  }, [settings.theme]);

  // ── handlers ──
  const applyBalanceDelta = (studentId, delta) => {
    setStudents(p => p.map(s => s.id === studentId ? {
      ...s,
      balance: s.balance + delta
    } : s));
  };
  const saveStudent = data => {
    const edit = modal?.payload;
    if (edit) setStudents(p => p.map(s => s.id === edit.id ? {
      ...s,
      ...data
    } : s));else setStudents(p => [...p, {
      ...data,
      id: Date.now(),
      balance: 0
    }]);
    setModal(null);
  };
  const archiveStudent = (id, archived = true) => {
    setStudents(p => p.map(s => s.id === id ? {
      ...s,
      archived
    } : s));
    if (archived) setGroups(p => p.map(g => ({
      ...g,
      studentIds: g.studentIds.filter(x => x !== id)
    })));
  };
  const delStudent = id => {
    const snapL = [...lessons],
      snapS = [...students],
      snapT = [...txs],
      snapG = [...groups];
    const student = students.find(s => s.id === id);
    recordDeletion(`Ученик ${student?.name || ''}`.trim(), () => {
      setLessons(snapL);
      setStudents(snapS);
      setTxs(snapT);
      setGroups(snapG);
    });
    setStudents(p => p.filter(s => s.id !== id));
    setGroups(p => p.map(g => ({
      ...g,
      studentIds: g.studentIds.filter(x => x !== id)
    })));
    triggerUndo(`${student?.name || 'Ученик'} удалён`, snapL, snapS, snapT, snapG);
  };
  const saveGroup = data => {
    const edit = modal?.payload;
    if (edit) setGroups(p => p.map(g => g.id === edit.id ? {
      ...g,
      ...data
    } : g));else setGroups(p => [...p, {
      ...data,
      id: Date.now()
    }]);
    setModal(null);
  };
  const delGroup = id => {
    const snapG = [...groups];
    const group = groups.find(g => g.id === id);
    recordDeletion(`Группа ${group?.name || ''}`.trim(), () => setGroups(snapG));
    setGroups(p => p.filter(g => g.id !== id));
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setPendingUndo({
      label: 'Группа удалена',
      restore: () => setGroups(snapG)
    });
    undoTimerRef.current = setTimeout(() => setPendingUndo(null), 4000);
  };
  const saveTx = data => {
    const edit = modal?.type === 'transaction' ? modal?.payload : null;
    if (edit) {
      const nextTx = {
        ...edit,
        ...data
      };
      setTxs(p => p.map(tx => tx.id === edit.id ? nextTx : tx));
      applyBalanceDelta(edit.studentId, -txDelta(edit));
      applyBalanceDelta(nextTx.studentId, txDelta(nextTx));
    } else {
      const tx = {
        ...data,
        id: Date.now()
      };
      setTxs(p => [tx, ...p]);
      applyBalanceDelta(data.studentId, txDelta(tx));
    }
    setModal(null);
  };
  const delTx = tx => {
    const snapS = [...students],
      snapT = [...txs];
    const student = students.find(s => s.id === tx.studentId);
    recordDeletion(`Операция ${student?.name || 'ученика'} ${money(tx.amount)}`, () => {
      setStudents(snapS);
      setTxs(snapT);
    });
    setTxs(p => p.filter(t => t.id !== tx.id));
    if (tx.kind === 'package' && tx.packageLessons) {
      setStudents(p => p.map(s => s.id === tx.studentId ? {
        ...s,
        packageLessons: Math.max(0, (s.packageLessons || 0) - tx.packageLessons)
      } : s));
    } else {
      applyBalanceDelta(tx.studentId, -txDelta(tx));
    }
    triggerUndo('Операция удалена', lessons, snapS, snapT);
  };
  const confirmLessonConflicts = (items, ignoreId = null) => {
    const arr = Array.isArray(items) ? items : [items];
    const conflicts = arr.flatMap(item => findLessonConflicts(item, lessons, students, groups, ignoreId));
    const unique = [...new Map(conflicts.map(l => [l.id, l])).values()];
    if (!unique.length) return true;
    return confirm(`Есть конфликт расписания:\n\n${conflictText(unique, groups, students)}\n\nВсе равно сохранить?`);
  };
  const saveLesson = (data, editId = null, options = {}) => {
    if (!confirmLessonConflicts(data, editId)) return;
    if (editId) {
      const editLesson = lessons.find(l => l.id === editId);
      const patch = data[0];
      setLessons(p => p.map(l => {
        if (l.id === editId) return {
          ...l,
          ...patch
        };
        if (options.applySeries && editLesson?.seriesId && l.seriesId === editLesson.seriesId && l.status === 'planned') {
          return {
            ...l,
            type: patch.type,
            targetId: patch.targetId,
            subject: patch.subject,
            time: patch.time
          };
        }
        return l;
      }));
    } else {
      const arr = Array.isArray(data) ? data : [data];
      setLessons(p => [...p, ...arr.map((l, i) => ({
        ...l,
        id: Date.now() + i,
        status: 'planned'
      }))]);
    }
    setModal(null);
  };
  const moveLesson = (lessonId, date, time) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const patch = {
      ...lesson,
      date,
      time
    };
    if (!confirmLessonConflicts(patch, lessonId)) return;
    setLessons(p => p.map(l => l.id === lessonId ? {
      ...l,
      date,
      time
    } : l));
    setSelDate(date);
  };
  const rescheduleLesson = (lessonId, date, time) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const newLesson = {
      ...lesson,
      id: Date.now(),
      date,
      time,
      status: 'planned',
      attendance: undefined,
      rescheduledFrom: lesson.id,
      packageUse: {}
    };
    setLessons(p => p.map(l => l.id === lessonId ? {
      ...l,
      status: 'rescheduled',
      rescheduledTo: newLesson.id
    } : l).concat(newLesson));
    setModal(null);
  };
  const savePackage = (studentId, lessonsCount, amount) => {
    setStudents(p => p.map(s => s.id === studentId ? {
      ...s,
      packageLessons: (s.packageLessons || 0) + lessonsCount
    } : s));
    if (amount > 0) {
      const tx = {
        id: Date.now(),
        studentId,
        type: 'payment',
        amount,
        date: getTodayDate(),
        comment: `Абонемент: ${lessonsCount} зан.`,
        kind: 'package',
        packageLessons: lessonsCount
      };
      setTxs(p => [tx, ...p]);
    }
    setModal(null);
  };
  const delLesson = (id, e) => {
    if (e) e.stopPropagation();
    const snapL = [...lessons],
      snapS = [...students],
      snapT = [...txs];
    const lesson = lessons.find(l => l.id === id);
    recordDeletion(`Занятие ${lesson ? `${fmtDate(lesson.date)} ${lesson.time}` : ''}`.trim(), () => {
      setLessons(snapL);
      setStudents(snapS);
      setTxs(snapT);
    });
    if (lesson?.status === 'no_show') {
      removeNoShowCharges(id);
    } else if (lesson?.status === 'completed') {
      const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
      const refunds = [];
      const upd = {};
      const pkgRefunds = [];
      Object.entries(lesson.attendance || {}).forEach(([sid, pres]) => {
        if (!pres) return;
        const s = students.find(st => st.id === Number(sid));
        if (!s) return;
        if (lesson.packageUse?.[s.id]) {
          pkgRefunds.push(s.id);
          return;
        }
        const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
        refunds.push({
          id: Date.now() + Math.random(),
          studentId: s.id,
          type: 'payment',
          amount: rate,
          date: getTodayDate(),
          comment: `Отмена: ${fmtDate(lesson.date)}`,
          lessonId: id,
          kind: 'attendance'
        });
        upd[s.id] = (upd[s.id] || 0) + rate;
      });
      if (refunds.length) setTxs(p => [...refunds, ...p]);
      setStudents(p => p.map(s => upd[s.id] !== undefined || pkgRefunds.includes(s.id) ? {
        ...s,
        balance: s.balance + (upd[s.id] || 0),
        packageLessons: (s.packageLessons || 0) + (pkgRefunds.includes(s.id) ? 1 : 0)
      } : s));
    }
    setLessons(p => p.filter(l => l.id !== id));
    setModal(null);
    triggerUndo('Занятие удалено', snapL, snapS, snapT);
  };
  const chargeNoShow = lesson => {
    const already = txs.some(tx => tx.lessonId === lesson.id && tx.kind === 'no_show');
    if (already) return;
    const ls = getLessonStudents(lesson, students, groups);
    const charges = ls.map((s, i) => ({
      id: Date.now() + i + Math.random(),
      studentId: s.id,
      type: 'charge',
      amount: getLessonRate(lesson, s, groups),
      date: getTodayDate(),
      comment: `Неявка: ${fmtDate(lesson.date)}`,
      lessonId: lesson.id,
      kind: 'no_show'
    }));
    if (!charges.length) return;
    setTxs(p => [...charges, ...p]);
    setStudents(p => p.map(s => {
      const charge = charges.find(tx => tx.studentId === s.id);
      return charge ? {
        ...s,
        balance: s.balance - charge.amount
      } : s;
    }));
  };
  const removeNoShowCharges = lessonId => {
    const own = txs.filter(tx => tx.lessonId === lessonId && tx.kind === 'no_show');
    if (!own.length) return;
    setTxs(p => p.filter(tx => !(tx.lessonId === lessonId && tx.kind === 'no_show')));
    setStudents(p => p.map(s => {
      const refund = own.filter(tx => tx.studentId === s.id).reduce((sum, tx) => sum + tx.amount, 0);
      return refund ? {
        ...s,
        balance: s.balance + refund
      } : s;
    }));
  };
  const removeLessonAttendanceTxs = lessonId => {
    const own = txs.filter(tx => tx.lessonId === lessonId && tx.kind === 'attendance');
    if (!own.length) return;
    setTxs(p => p.filter(tx => !(tx.lessonId === lessonId && tx.kind === 'attendance')));
    setStudents(p => p.map(s => {
      const delta = own.filter(tx => tx.studentId === s.id).reduce((sum, tx) => sum - txDelta(tx), 0);
      return delta ? {
        ...s,
        balance: s.balance + delta
      } : s;
    }));
  };
  const setLessonStatus = (lessonId, status) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    if (lesson.status === 'no_show' && status !== 'no_show') removeNoShowCharges(lessonId);
    if (lesson.status === 'completed' && status !== 'completed') {
      removeLessonAttendanceTxs(lessonId);
      const pkgRefunds = Object.entries(lesson.packageUse || {}).filter(([, used]) => used).map(([sid]) => Number(sid));
      if (pkgRefunds.length) {
        setStudents(p => p.map(s => pkgRefunds.includes(s.id) ? {
          ...s,
          packageLessons: (s.packageLessons || 0) + 1
        } : s));
      }
    }
    if (status === 'no_show') chargeNoShow(lesson);
    const attendance = status === 'no_show' ? Object.fromEntries(getLessonStudents(lesson, students, groups).map(s => [s.id, false])) : lesson.attendance;
    setLessons(p => p.map(l => l.id === lessonId ? {
      ...l,
      status,
      attendance,
      packageUse: status === 'planned' ? {} : l.packageUse || {}
    } : l));
    setModal(null);
  };
  const saveAttendance = (lessonId, newAtt, meta = {}) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    if (lesson.status === 'no_show') removeNoShowCharges(lessonId);
    const ls = getLessonStudents(lesson, students, groups);

    // KEY: always compute diff from the OLD attendance state
    // For planned → completed: charge everyone who IS present now
    // For completed → edited: only charge/refund the DELTA (who changed status)
    const oldAtt = lesson.status === 'completed' && lesson.attendance ? lesson.attendance : {};
    const newTxs = [];
    const upd = {};
    const updPkg = {};
    const oldPackageUse = lesson.packageUse || {};
    const nextPackageUse = {
      ...oldPackageUse
    };
    ls.forEach(s => {
      const was = !!oldAtt[s.id];
      const is = !!newAtt[s.id];
      const packageAvailable = (s.packageLessons || 0) + (updPkg[s.id] || 0);
      if (lesson.status === 'planned') {
        // First time completing: charge only present students
        if (is) {
          if (packageAvailable > 0) {
            updPkg[s.id] = (updPkg[s.id] || 0) - 1;
            nextPackageUse[s.id] = true;
          } else {
            const rate = getLessonRate(lesson, s, groups);
            newTxs.push({
              id: Date.now() + Math.random(),
              studentId: s.id,
              type: 'charge',
              amount: rate,
              date: getTodayDate(),
              comment: `Урок: ${fmtDate(lesson.date)}`,
              lessonId,
              kind: 'attendance'
            });
            upd[s.id] = (upd[s.id] || 0) - rate;
            delete nextPackageUse[s.id];
          }
        }
      } else {
        // Already completed: only apply CHANGES
        if (was === is) return; // no change — skip entirely (prevents double-counting)
        const rate = getLessonRate(lesson, s, groups);
        if (was && !is) {
          if (oldPackageUse[s.id]) {
            updPkg[s.id] = (updPkg[s.id] || 0) + 1;
            delete nextPackageUse[s.id];
          } else {
            // Was present, now absent → refund
            newTxs.push({
              id: Date.now() + Math.random(),
              studentId: s.id,
              type: 'payment',
              amount: rate,
              date: getTodayDate(),
              comment: `Возврат (отсутствовал): ${fmtDate(lesson.date)}`,
              lessonId,
              kind: 'attendance'
            });
            upd[s.id] = (upd[s.id] || 0) + rate;
          }
        } else {
          if (packageAvailable > 0) {
            updPkg[s.id] = (updPkg[s.id] || 0) - 1;
            nextPackageUse[s.id] = true;
          } else {
            // Was absent, now present → charge
            newTxs.push({
              id: Date.now() + Math.random(),
              studentId: s.id,
              type: 'charge',
              amount: rate,
              date: getTodayDate(),
              comment: `Доп. списание (пришёл): ${fmtDate(lesson.date)}`,
              lessonId,
              kind: 'attendance'
            });
            upd[s.id] = (upd[s.id] || 0) - rate;
            delete nextPackageUse[s.id];
          }
        }
      }
    });
    if (newTxs.length) {
      setTxs(p => [...newTxs, ...p]);
    }
    setStudents(p => p.map(s => upd[s.id] !== undefined || updPkg[s.id] !== undefined ? {
      ...s,
      balance: s.balance + (upd[s.id] || 0),
      packageLessons: Math.max(0, (s.packageLessons || 0) + (updPkg[s.id] || 0))
    } : s));
    setLessons(p => p.map(l => l.id === lessonId ? {
      ...l,
      ...meta,
      status: 'completed',
      attendance: newAtt,
      packageUse: nextPackageUse
    } : l));
    setModal(null);
  };
  const closeTodayLessons = () => {
    const now = new Date();
    const due = lessons.filter(l => l.status === 'planned' && l.date === getTodayDate() && new Date(`${l.date}T${l.time}`) <= now);
    if (!due.length) return;
    if (!confirm(`Закрыть прошедшие уроки за сегодня: ${due.length}? Все ученики будут отмечены присутствующими.`)) return;
    due.forEach(l => {
      const att = {};
      getLessonStudents(l, students, groups).forEach(s => {
        att[s.id] = true;
      });
      saveAttendance(l.id, att);
    });
  };
  const resetDemoData = () => {
    if (!confirm('Сбросить все данные к демо-набору? Текущие изменения сотрутся.')) return;
    const demo = cloneDemoState();
    localStorage.removeItem(STORAGE_KEY);
    setStudents(demo.students);
    setGroups(demo.groups);
    setLessons(demo.lessons);
    setTxs(demo.txs);
  };
  const exportCsv = () => {
    const header = ['date', 'student', 'type', 'amount', 'comment'];
    const rows = txs.map(tx => {
      const s = students.find(st => st.id === tx.studentId);
      return [tx.date, s?.name || 'Удален', tx.type, tx.amount, tx.comment || ''].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });
    const blob = new Blob([[header.join(','), ...rows].join('\n')], {
      type: 'text/csv;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tutor-finance-${getTodayDate()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportJson = () => {
    const snapshot = {
      version: STORAGE_VERSION,
      exportedAt: new Date().toISOString(),
      students,
      groups,
      lessons,
      txs,
      settings
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tutor-backup-${getTodayDate()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.students || !data.lessons) {
            alert('Файл не распознан — нет данных об учениках или уроках');
            return;
          }
          const date = data.exportedAt ? new Date(data.exportedAt).toLocaleString('ru-RU') : 'неизвестная дата';
          if (!confirm(`Загрузить бэкап от ${date}?\n\nТекущие данные будут полностью заменены.`)) return;
          setStudents(data.students || []);
          setGroups(data.groups || []);
          setLessons(data.lessons || []);
          setTxs(data.txs || []);
          if (data.settings) setSettings(data.settings);
        } catch {
          alert('Не удалось прочитать файл — возможно, он повреждён.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };
  const exportSchedulePdf = (fromDate, toDate) => {
    const filtered = lessons.filter(l => l.date >= fromDate && l.date <= toDate).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const getName = l => l.type === 'group' ? groups.find(g => g.id === l.targetId)?.name || '?' : students.find(s => s.id === l.targetId)?.name || '?';
    const statusRu = s => LESSON_STATUS[s]?.label || s;
    const cards = filtered.map(l => `
      <section class="lesson-card-print">
        <div class="time">${l.time}</div>
        <div class="body">
          <div class="date">${fmtDate(l.date)} · ${l.type === 'group' ? 'Группа' : 'Индивидуально'} · ${statusRu(l.status)}</div>
          <h3>${getName(l)}</h3>
          <div class="chips"><span>${l.subject || '—'}</span>${l.topic ? `<span>${l.topic}</span>` : ''}</div>
          <div class="checks">
            <label><i></i> Проведено</label>
            <label><i></i> Оплата</label>
            <label><i></i> ДЗ</label>
            <label><i></i> Напомнить</label>
          </div>
          <div class="notes">Заметки:</div>
        </div>
      </section>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>Расписание ${fromDate} — ${toDate}</title>
    <style>
      body{font-family:Inter,Arial,sans-serif;font-size:12px;padding:18px;color:#151515}
      h2{margin:0 0 4px;font-size:20px}
      .sub{color:#666;margin:0 0 14px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .lesson-card-print{break-inside:avoid;display:grid;grid-template-columns:68px 1fr;border:2px solid #1d1d1d;border-radius:8px;overflow:hidden;min-height:132px;background:#fff}
      .time{background:#f3d45f;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px}
      .body{padding:10px 12px}
      .date{font-size:10px;color:#666;text-transform:uppercase;font-weight:800;margin-bottom:3px}
      h3{font-size:15px;line-height:1.2;margin:0 0 6px}
      .chips{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}
      .chips span{border:1.5px solid #222;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;text-transform:uppercase}
      .checks{display:grid;grid-template-columns:1fr 1fr;gap:5px 10px;margin:8px 0}
      .checks label{font-size:11px;display:flex;align-items:center;gap:5px}
      .checks i{width:13px;height:13px;border:1.8px solid #222;display:inline-block;border-radius:2px}
      .notes{height:22px;border-bottom:1px solid #999;color:#777;font-size:10px}
      @media print{body{padding:0}.grid{gap:8px}}
    </style></head><body>
    <h2>Расписание: ${fmtDate(fromDate)} — ${fmtDate(toDate)}</h2>
    <p class="sub">Всего занятий: ${filtered.length}</p>
    <div class="grid">${cards}</div>
    </body></html>`;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
    }, 400);
  };
  const toggleTheme = () => {
    setSettings(p => ({
      ...p,
      theme: p.theme === 'dark' ? 'light' : 'dark'
    }));
  };
  const getLessonName = l => l.type === 'group' ? groups.find(g => g.id === l.targetId)?.name || '?' : students.find(s => s.id === l.targetId)?.name || '?';

  // ── PAGES ──────────────────────────────────────────────────────────────────

  // TODAY PAGE
  const PageToday = () => {
    const todayLessons = lessons.filter(l => l.date === getTodayDate()).sort((a, b) => a.time.localeCompare(b.time));
    const activeStudents = students.filter(s => !s.archived);
    const debt = activeStudents.filter(s => s.balance < 0).reduce((s, st) => s + Math.abs(st.balance), 0);
    const debtors = activeStudents.filter(s => s.balance < 0).length;
    const now = new Date();
    const plannedToday = todayLessons.filter(l => l.status === 'planned');
    const dueToday = plannedToday.filter(l => new Date(`${l.date}T${l.time}`) <= now);
    const nextLesson = plannedToday.find(l => new Date(`${l.date}T${l.time}`) > now) || plannedToday[0];
    const todayTxs = txs.filter(tx => tx.date === getTodayDate());
    const earnedToday = todayTxs.filter(tx => tx.type === 'payment').reduce((s, tx) => s + tx.amount, 0);
    const chargedToday = todayTxs.filter(tx => tx.type === 'charge').reduce((s, tx) => s + tx.amount, 0);
    const futureLessons = lessons.filter(l => l.status === 'planned' && l.date >= getTodayDate());
    const attention = [...activeStudents.filter(s => s.balance < 0).slice(0, 4).map(s => ({
      kind: 'Долг',
      text: `${s.name}: ${money(Math.abs(s.balance))}`,
      student: s
    })), ...activeStudents.filter(s => (s.packageLessons || 0) === 1).slice(0, 3).map(s => ({
      kind: 'Абонемент',
      text: `${s.name}: остался 1 урок`,
      student: s
    })), ...activeStudents.filter(s => !futureLessons.some(l => getLessonStudents(l, students, groups).some(st => st.id === s.id))).slice(0, 3).map(s => ({
      kind: 'Нет уроков',
      text: s.name,
      student: s
    }))].slice(0, 6);
    // Active lesson detection
    const currentLesson = todayLessons.find(l => {
      if (l.status !== 'planned') return false;
      const s = new Date(`${l.date}T${l.time}`).getTime();
      const e = s + (l.duration || 60) * 60000;
      return now.getTime() >= s && now.getTime() <= e;
    });
    return _jsxs("div", {
      children: [currentLesson && _jsx(TimerBanner, {
        lesson: currentLesson,
        name: getLessonName(currentLesson),
        onAttend: () => setModal({
          type: 'attendance',
          payload: currentLesson
        })
      }), _jsxs("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 20
        },
        children: [_jsxs("div", {
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 11,
              color: 'var(--text-sec)',
              textTransform: 'uppercase',
              letterSpacing: '.05em'
            },
            children: new Date().toLocaleDateString('ru-RU', {
              weekday: 'long'
            })
          }), _jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1.1
            },
            children: new Date().toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long'
            })
          })]
        }), _jsxs("div", {
          style: {
            display: 'flex',
            gap: 8,
            alignItems: 'flex-start'
          },
          children: [debt > 0 && _jsxs("div", {
            style: {
              background: 'var(--red)',
              border: 'var(--border)',
              borderRadius: 4,
              padding: '8px 12px',
              boxShadow: 'var(--shadow)'
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 9,
                color: '#fff',
                textTransform: 'uppercase'
              },
              children: "\u0414\u043E\u043B\u0433\u0438"
            }), _jsxs("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 16,
                fontWeight: 900,
                color: '#fff'
              },
              children: [debt.toLocaleString(), " \u20BD"]
            }), _jsxs("div", {
              style: {
                fontSize: 10,
                color: 'rgba(255,255,255,.8)'
              },
              children: [debtors, " \u0447\u0435\u043B."]
            })]
          }), _jsx("button", {
            className: "btn btn-sm btn-white theme-toggle",
            onClick: toggleTheme,
            title: settings.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема',
            children: settings.theme === 'dark' ? '☀' : '☾'
          })]
        })]
      }), students.length === 0 && lessons.length === 0 && _jsx(EmptyState, {
        title: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0443\u0447\u0435\u043D\u0438\u043A\u0430",
        text: "\u0414\u0435\u043C\u043E-\u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043C\u0435\u0448\u0430\u044E\u0442: \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430, \u0437\u0430\u0442\u0435\u043C \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u0438\u043B\u0438 \u0433\u0440\u0443\u043F\u043F\u0443.",
        action: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430",
        onAction: () => setModal({
          type: 'student',
          payload: null
        })
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          marginBottom: 12
        },
        children: [_jsxs("div", {
          className: "stat-card",
          style: {
            background: 'var(--black)',
            color: 'var(--yellow)'
          },
          children: [_jsx("div", {
            className: "stat-label",
            style: {
              color: 'var(--text-muted)'
            },
            children: "\u0423\u0440\u043E\u043A\u043E\u0432"
          }), _jsx("div", {
            className: "stat-value",
            style: {
              fontSize: 20
            },
            children: todayLessons.length
          })]
        }), _jsxs("div", {
          className: "stat-card",
          children: [_jsx("div", {
            className: "stat-label",
            children: "\u0423\u0447\u0435\u043D\u0438\u043A\u043E\u0432"
          }), _jsx("div", {
            className: "stat-value",
            style: {
              fontSize: 20
            },
            children: activeStudents.length
          })]
        }), _jsxs("div", {
          className: "stat-card",
          style: {
            background: chargedToday > 0 ? 'var(--green)' : 'var(--white)'
          },
          children: [_jsx("div", {
            className: "stat-label",
            style: {
              color: chargedToday > 0 ? 'rgba(0,0,0,.6)' : 'var(--text-sec)'
            },
            children: "\u0417\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E"
          }), _jsx("div", {
            className: "stat-value",
            style: {
              fontSize: chargedToday >= 10000 ? 14 : chargedToday > 0 ? 16 : 20,
              color: chargedToday > 0 ? '#fff' : 'var(--black)',
              lineHeight: 1.2
            },
            children: chargedToday > 0 ? money(chargedToday) : '—'
          })]
        })]
      }), _jsx("div", {
        className: "card",
        style: {
          padding: 12,
          marginBottom: 16
        },
        children: _jsxs("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10
          },
          children: [_jsxs("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [_jsx("div", {
              className: "label",
              children: "\u0417\u0430\u043A\u0440\u044B\u0442\u0438\u0435 \u0434\u043D\u044F"
            }), _jsx("div", {
              style: {
                fontSize: 12,
                lineHeight: 1.6
              },
              children: nextLesson ? _jsxs(_Fragment, {
                children: ["\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439: ", _jsx("strong", {
                  children: nextLesson.time
                }), " \xB7 ", getLessonName(nextLesson)]
              }) : 'Все уроки на сегодня обработаны'
            }), _jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)',
                marginTop: 4
              },
              children: ["\u041E\u043F\u043B\u0430\u0442\u044B: ", money(earnedToday), " \xB7 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F: ", money(chargedToday)]
            })]
          }), _jsxs("button", {
            className: `btn btn-sm ${dueToday.length ? 'btn-green' : 'btn-white'}`,
            disabled: !dueToday.length,
            onClick: closeTodayLessons,
            children: ["\u0417\u0430\u043A\u0440\u044B\u0442\u044C ", dueToday.length || '']
          })]
        })
      }), attention.length > 0 && _jsxs("div", {
        className: "card",
        style: {
          padding: 12,
          marginBottom: 16
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 12,
            fontWeight: 900,
            marginBottom: 8
          },
          children: "\u0422\u0420\u0415\u0411\u0423\u0415\u0422 \u0412\u041D\u0418\u041C\u0410\u041D\u0418\u042F"
        }), attention.map((item, i) => {
          const phoneClean = (item.student.phone || '').replace(/\s/g, '');
          return _jsxs("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 0',
              borderTop: i ? '1px solid var(--border-light)' : 'none'
            },
            children: [_jsx("span", {
              className: `badge ${item.kind === 'Долг' ? 'badge-red' : item.kind === 'Абонемент' ? 'badge-yellow' : 'badge-green'}`,
              children: item.kind
            }), _jsx("div", {
              style: {
                fontSize: 12,
                flex: 1
              },
              children: item.text
            }), item.student.phone && _jsx("a", {
              href: `tel:${phoneClean}`,
              className: "btn btn-sm btn-white",
              style: {
                padding: '4px 7px',
                textDecoration: 'none',
                color: 'inherit',
                minHeight: 'auto'
              },
              onClick: e => e.stopPropagation(),
              title: "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C",
              children: _jsx(IcoPhone, {
                size: 14
              })
            }), item.student.tgId && _jsx("button", {
              className: "btn btn-sm btn-blue",
              style: {
                padding: '4px 7px',
                minHeight: 'auto'
              },
              onClick: () => {
                const id = String(item.student.tgId).trim();
                window.open(id.startsWith('@') ? `https://t.me/${id.slice(1)}` : `https://t.me/${id}`, '_blank');
              },
              title: "Telegram",
              children: _jsx(IcoTg, {
                size: 14
              })
            }), _jsx("button", {
              className: "btn btn-sm btn-white",
              style: {
                minHeight: 'auto'
              },
              onClick: () => setModal({
                type: 'message',
                payload: {
                  student: item.student
                }
              }),
              children: "\u0422\u0435\u043A\u0441\u0442"
            })]
          }, i);
        })]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 13,
            fontWeight: 900
          },
          children: "\u0421\u0415\u0413\u041E\u0414\u041D\u042F"
        }), _jsxs("button", {
          className: "btn btn-sm btn-black",
          onClick: () => setModal({
            type: 'lesson',
            payload: {
              date: getTodayDate()
            }
          }),
          children: [_jsx(IcoPlus, {
            size: 14
          }), " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"]
        })]
      }), todayLessons.length === 0 ? _jsx("div", {
        className: "card",
        style: {
          padding: 24,
          textAlign: 'center'
        },
        children: _jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.5
          },
          children: "\u0423\u0440\u043E\u043A\u043E\u0432 \u043D\u0435\u0442"
        })
      }) : todayLessons.map(l => _jsx(LessonCard, {
        lesson: l,
        name: getLessonName(l),
        onEdit: () => setModal({
          type: 'lesson',
          payload: {
            lesson: l
          }
        }),
        onAttend: () => setModal({
          type: 'attendance',
          payload: l
        }),
        onStatus: () => setModal({
          type: 'lessonStatus',
          payload: l
        }),
        onDelete: e => delLesson(l.id, e)
      }, l.id)), (() => {
        const upcoming = [];
        for (let i = 1; i < 7; i++) {
          const d = new Date();
          d.setDate(d.getDate() + i);
          const ds = localDateString(d);
          const ls = lessons.filter(l => l.date === ds);
          if (ls.length) upcoming.push({
            date: ds,
            lessons: ls.sort((a, b) => a.time.localeCompare(b.time))
          });
        }
        if (!upcoming.length) return null;
        return _jsxs("div", {
          style: {
            marginTop: 20
          },
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 13,
              fontWeight: 900,
              marginBottom: 10
            },
            children: "\u0411\u041B\u0418\u0416\u0410\u0419\u0428\u0418\u0415"
          }), upcoming.map(({
            date,
            lessons: ls
          }) => _jsxs("div", {
            style: {
              marginBottom: 8
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 10,
                color: 'var(--text-sec)',
                marginBottom: 6,
                textTransform: 'uppercase'
              },
              children: new Date(date + 'T00:00:00').toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              })
            }), ls.map(l => _jsx(LessonCard, {
              lesson: l,
              name: getLessonName(l),
              compact: true,
              onEdit: () => setModal({
                type: 'lesson',
                payload: {
                  lesson: l
                }
              }),
              onAttend: () => setModal({
                type: 'attendance',
                payload: l
              }),
              onStatus: () => setModal({
                type: 'lessonStatus',
                payload: l
              }),
              onDelete: e => delLesson(l.id, e)
            }, l.id))]
          }, date))]
        });
      })()]
    });
  };

  // SCHEDULE PAGE
  const PageSchedule = () => {
    const scheduleLessons = schedSubject === 'all' ? lessons : lessons.filter(l => getLessonSubject(l, groups) === schedSubject);
    const WeekView = () => {
      // Mon–Sun of selected week
      const getWeekDates = offset => {
        const today = new Date();
        const dow = today.getDay() || 7; // Mon=1..Sun=7
        const mon = new Date(today);
        mon.setDate(today.getDate() - dow + 1 + offset * 7);
        return Array.from({
          length: 7
        }, (_, i) => {
          const d = new Date(mon);
          d.setDate(mon.getDate() + i);
          return localDateString(d);
        });
      };
      const weekDates = getWeekDates(weekOffset);
      const DAY_LABELS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
      const today = getTodayDate();

      // All unique times in this week, sorted
      const weekLessons = scheduleLessons.filter(l => weekDates.includes(l.date));
      const allTimes = [...new Set(weekLessons.map(l => l.time))].sort();

      // Week label
      const [wStart, wEnd] = [weekDates[0], weekDates[6]];
      const fmtShort = ds => new Date(ds + 'T00:00:00').toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      });
      const swipeRef = useSwipe(() => setWeekOffset(w => w + 1), () => setWeekOffset(w => w - 1));

      // Mobile: selected day within week
      const [mobileDay, setMobileDay] = useState(() => {
        const todayIdx = weekDates.indexOf(today);
        return todayIdx >= 0 ? todayIdx : 0;
      });
      const mobileDayLessons = scheduleLessons.filter(l => l.date === weekDates[mobileDay]).sort((a, b) => a.time.localeCompare(b.time));
      return _jsxs("div", {
        ref: swipeRef,
        className: "sched-swipe",
        children: [_jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14
          },
          children: [_jsx("button", {
            className: "btn btn-sm btn-white",
            onClick: () => setWeekOffset(w => w - 1),
            children: _jsx(IcoChevL, {
              size: 16
            })
          }), _jsxs("div", {
            style: {
              textAlign: 'center'
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 11,
                fontWeight: 900
              },
              children: weekOffset === 0 ? 'ЭТА НЕДЕЛЯ' : weekOffset === 1 ? 'СЛЕДУЮЩАЯ' : weekOffset === -1 ? 'ПРОШЛАЯ' : `${weekOffset > 0 ? '+' : ''}${weekOffset} НЕД.`
            }), _jsxs("div", {
              style: {
                fontSize: 10,
                color: 'var(--text-sec)'
              },
              children: [fmtShort(wStart), " \u2014 ", fmtShort(wEnd)]
            })]
          }), _jsx("button", {
            className: "btn btn-sm btn-white",
            onClick: () => setWeekOffset(w => w + 1),
            children: _jsx(IcoChevR, {
              size: 16
            })
          })]
        }), _jsxs("div", {
          className: "sched-mobile",
          children: [_jsx("div", {
            className: "day-strip",
            style: {
              marginBottom: 14
            },
            children: weekDates.map((d, i) => {
              const isToday = d === today;
              const num = new Date(d + 'T00:00:00').getDate();
              const dayCount = scheduleLessons.filter(l => l.date === d).length;
              return _jsxs("button", {
                className: `day-btn ${mobileDay === i ? 'active' : ''}`,
                onClick: () => setMobileDay(i),
                style: {
                  minWidth: 44,
                  position: 'relative'
                },
                children: [_jsx("span", {
                  className: "day-btn-name",
                  children: DAY_LABELS[i]
                }), _jsx("span", {
                  className: "day-btn-date",
                  children: num
                }), dayCount > 0 && _jsx("div", {
                  className: "day-btn-dot",
                  style: {
                    background: isToday ? 'var(--yellow)' : 'var(--blue)'
                  }
                })]
              }, d);
            })
          }), mobileDayLessons.length === 0 ? _jsx("div", {
            className: "card",
            style: {
              padding: 24,
              textAlign: 'center'
            },
            children: _jsxs("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 12,
                color: 'var(--text-muted)'
              },
              children: ["\u041D\u0435\u0442 \u0443\u0440\u043E\u043A\u043E\u0432 \xB7 ", _jsx("span", {
                style: {
                  cursor: 'pointer',
                  color: 'var(--blue)'
                },
                onClick: () => setModal({
                  type: 'lesson',
                  payload: {
                    date: weekDates[mobileDay]
                  }
                }),
                children: "+ \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C"
              })]
            })
          }) : mobileDayLessons.map((l, idx) => _jsx(LessonCard, {
            lesson: l,
            name: getLessonName(l),
            onEdit: () => setModal({
              type: 'lesson',
              payload: {
                lesson: l
              }
            }),
            onAttend: () => setModal({
              type: 'attendance',
              payload: l
            }),
            onStatus: () => setModal({
              type: 'lessonStatus',
              payload: l
            }),
            onDelete: e => delLesson(l.id, e)
          }, l.id))]
        }), _jsx("div", {
          className: "sched-desktop",
          children: _jsx("div", {
            className: "schedule-grid-wrap",
            children: _jsxs("table", {
              className: "schedule-table",
              children: [_jsx("thead", {
                children: _jsxs("tr", {
                  children: [_jsx("th", {
                    style: {
                      width: 52
                    }
                  }), weekDates.map((d, i) => {
                    const isToday = d === today;
                    const num = new Date(d + 'T00:00:00').getDate();
                    return _jsxs("th", {
                      onClick: () => setSelDate(d),
                      className: `schedule-head-cell ${isToday ? 'today' : ''} ${selDate === d ? 'selected' : ''}`,
                      children: [_jsx("div", {
                        style: {
                          fontSize: 10
                        },
                        children: DAY_LABELS[i]
                      }), _jsx("div", {
                        style: {
                          fontSize: 24,
                          lineHeight: 1.05
                        },
                        children: num
                      })]
                    }, d);
                  })]
                })
              }), _jsx("tbody", {
                children: allTimes.length === 0 ? _jsx("tr", {
                  children: _jsx("td", {
                    colSpan: 8,
                    children: _jsx("div", {
                      style: {
                        textAlign: 'center',
                        padding: '32px 0',
                        fontFamily: 'Unbounded,cursive',
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        border: '2.5px dashed var(--border-dashed)',
                        borderRadius: 4
                      },
                      children: "\u0423\u0440\u043E\u043A\u043E\u0432 \u043D\u0430 \u044D\u0442\u0443 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0435\u0442"
                    })
                  })
                }) : allTimes.map(time => {
                  const byDay = {};
                  weekDates.forEach((d, i) => {
                    byDay[i] = scheduleLessons.filter(l => l.date === d && l.time === time);
                  });
                  return _jsxs("tr", {
                    children: [_jsx("td", {
                      className: "schedule-time-cell",
                      children: time
                    }), [0, 1, 2, 3, 4, 5, 6].map(di => {
                      const cell = byDay[di] || [];
                      if (cell.length === 0) {
                        return _jsx("td", {
                          style: {
                            padding: 2,
                            verticalAlign: 'top'
                          },
                          children: _jsx("div", {
                            onClick: () => setModal({
                              type: 'lesson',
                              payload: {
                                date: weekDates[di]
                              }
                            }),
                            onDragOver: e => e.preventDefault(),
                            onDrop: e => {
                              e.preventDefault();
                              const id = Number(e.dataTransfer.getData('text/lesson-id'));
                              if (id) moveLesson(id, weekDates[di], time);
                            },
                            className: "schedule-empty-cell"
                          })
                        }, di);
                      }
                      return _jsx("td", {
                        style: {
                          padding: 2,
                          verticalAlign: 'top'
                        },
                        onDragOver: e => e.preventDefault(),
                        onDrop: e => {
                          e.preventDefault();
                          const id = Number(e.dataTransfer.getData('text/lesson-id'));
                          if (id) moveLesson(id, weekDates[di], time);
                        },
                        children: cell.map(l => {
                          const name = getLessonName(l);
                          const done = isFinalLesson(l);
                          const statusInfo = LESSON_STATUS[l.status] || LESSON_STATUS.planned;
                          const hasConflict = findLessonConflicts(l, lessons, students, groups, l.id).length > 0;
                          return _jsxs("div", {
                            draggable: l.status === 'planned',
                            onDragStart: e => {
                              e.dataTransfer.setData('text/lesson-id', String(l.id));
                              e.dataTransfer.effectAllowed = 'move';
                            },
                            onClick: () => setModal({
                              type: l.status === 'planned' || l.status === 'completed' ? 'attendance' : 'lessonStatus',
                              payload: l
                            }),
                            className: `schedule-lesson-cell ${done ? 'done' : 'planned'} ${l.type === 'group' ? 'group' : 'individual'} ${hasConflict ? 'conflict' : ''}`,
                            onMouseEnter: e => {
                              if (!done) e.currentTarget.style.transform = 'translateY(-2px)';
                            },
                            onMouseLeave: e => e.currentTarget.style.transform = 'none',
                            children: [(() => {
                              const stList = getLessonStudents(l, students, groups);
                              const hasDebt = stList.some(s => s.balance < 0);
                              const hasNote = Boolean(l.lessonNote);
                              return hasDebt || hasConflict || hasNote ? _jsxs("div", {
                                className: "lesson-markers",
                                children: [hasNote && _jsx("span", {
                                  className: "lesson-marker-dot lesson-marker-note",
                                  title: "\u0415\u0441\u0442\u044C \u043F\u043E\u043C\u0435\u0442\u043A\u0430"
                                }), hasConflict && _jsx("span", {
                                  className: "lesson-marker-dot lesson-marker-conflict",
                                  title: "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F"
                                }), hasDebt && _jsx("span", {
                                  className: "lesson-marker-dot lesson-marker-debt",
                                  title: "\u0415\u0441\u0442\u044C \u0437\u0430\u0434\u043E\u043B\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u044C"
                                })]
                              }) : null;
                            })(), _jsx("div", {
                              className: "schedule-lesson-title",
                              children: name
                            }), _jsxs("div", {
                              className: "schedule-lesson-meta",
                              children: [_jsx("span", {
                                children: hasConflict ? `⚠ ${statusInfo.label}` : statusInfo.label
                              }), l.duration && l.duration !== 60 && _jsx("span", {
                                children: l.duration < 60 ? `${l.duration}м` : l.duration === 90 ? '1.5ч' : '2ч'
                              })]
                            })]
                          }, l.id);
                        })
                      }, di);
                    })]
                  }, time);
                })
              })]
            })
          })
        }), false && selDate && weekDates.includes(selDate) && (() => {
          const dl = scheduleLessons.filter(l => l.date === selDate).sort((a, b) => a.time.localeCompare(b.time));
          const obj = new Date(selDate + 'T00:00:00');
          return _jsxs("div", {
            style: {
              marginTop: 16,
              border: 'var(--border)',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 'var(--shadow)'
            },
            children: [_jsxs("div", {
              style: {
                background: 'var(--black)',
                color: 'var(--yellow)',
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              },
              children: [_jsx("span", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontSize: 11,
                  fontWeight: 900
                },
                children: obj.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                }).toUpperCase()
              }), _jsx("button", {
                className: "btn btn-sm",
                style: {
                  padding: '4px 8px',
                  fontSize: 9,
                  background: 'var(--yellow)',
                  color: 'var(--black)',
                  boxShadow: 'none'
                },
                onClick: () => setModal({
                  type: 'lesson',
                  payload: {
                    date: selDate
                  }
                }),
                children: "+ \u0423\u0420\u041E\u041A"
              })]
            }), dl.length === 0 ? _jsx("div", {
              style: {
                padding: '16px',
                textAlign: 'center',
                fontFamily: 'Unbounded,cursive',
                fontSize: 11,
                color: 'var(--text-muted)'
              },
              children: "\u041D\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u0438\u0439"
            }) : dl.map(l => {
              const stList = getLessonStudents(l, students, groups);
              const hasDebt = stList.some(s => s.balance < 0);
              return _jsxs("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderTop: '1.5px solid var(--border-light)'
                },
                children: [_jsxs("div", {
                  style: {
                    fontFamily: 'Unbounded,cursive',
                    fontSize: 14,
                    fontWeight: 900,
                    minWidth: 48,
                    color: isFinalLesson(l) ? 'var(--text-muted)' : 'var(--black)'
                  },
                  children: [_jsx("div", {
                    children: l.time
                  }), l.duration && l.duration !== 60 && _jsx("div", {
                    style: {
                      fontSize: 9,
                      fontWeight: 400,
                      color: 'var(--text-sec)',
                      marginTop: 1
                    },
                    children: l.duration < 60 ? `${l.duration}м` : l.duration === 90 ? '1.5ч' : '2ч'
                  })]
                }), _jsxs("div", {
                  style: {
                    flex: 1,
                    minWidth: 0
                  },
                  children: [_jsx("div", {
                    style: {
                      fontFamily: 'Unbounded,cursive',
                      fontSize: 10,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: isFinalLesson(l) ? 'var(--text-muted)' : 'var(--black)'
                    },
                    children: getLessonName(l)
                  }), hasDebt && _jsx("div", {
                    style: {
                      fontSize: 9,
                      color: 'var(--red)',
                      fontFamily: 'Unbounded,cursive',
                      fontWeight: 700,
                      marginTop: 2
                    },
                    children: "\u25CF \u0414\u041E\u041B\u0413"
                  })]
                }), l.status === 'planned' ? _jsx("button", {
                  className: "btn btn-sm btn-green",
                  onClick: () => setModal({
                    type: 'attendance',
                    payload: l
                  }),
                  children: _jsx(IcoPlay, {
                    size: 13
                  })
                }) : l.status === 'completed' ? _jsx("button", {
                  className: "btn btn-sm btn-white",
                  onClick: () => setModal({
                    type: 'attendance',
                    payload: l
                  }),
                  children: _jsx(IcoCheck, {
                    size: 13
                  })
                }) : _jsx("button", {
                  className: "btn btn-sm btn-white",
                  onClick: () => setModal({
                    type: 'lessonStatus',
                    payload: l
                  }),
                  children: LESSON_STATUS[l.status]?.label || l.status
                }), _jsx("button", {
                  style: {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: 'var(--text-muted)'
                  },
                  onClick: () => setModal({
                    type: 'lessonStatus',
                    payload: l
                  }),
                  children: _jsx(IcoEdit, {
                    size: 15
                  })
                }), _jsx("button", {
                  style: {
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: 'var(--text-muted)'
                  },
                  onClick: e => delLesson(l.id, e),
                  children: _jsx(IcoTrash, {
                    size: 15
                  })
                })]
              }, l.id);
            })]
          });
        })()]
      });
    };

    // ── MONTH VIEW ─────────────────────────────────────────────────────────────
    const MonthView = () => {
      const y = calMonth.getFullYear(),
        m = calMonth.getMonth();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      let firstDow = new Date(y, m, 1).getDay();
      firstDow = firstDow === 0 ? 6 : firstDow - 1; // Mon-based
      const today = getTodayDate();
      const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const fmtDs = d => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const selDateObj = new Date(selDate + 'T00:00:00');
      const selDayLessons = scheduleLessons.filter(l => l.date === selDate).sort((a, b) => a.time.localeCompare(b.time));
      return _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14
          },
          children: [_jsx("button", {
            className: "btn btn-sm btn-white",
            onClick: () => setCalMonth(new Date(y, m - 1, 1)),
            children: _jsx(IcoChevL, {
              size: 16
            })
          }), _jsxs("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 14,
              fontWeight: 900
            },
            children: [MONTH_RU[m], " ", y]
          }), _jsx("button", {
            className: "btn btn-sm btn-white",
            onClick: () => setCalMonth(new Date(y, m + 1, 1)),
            children: _jsx(IcoChevR, {
              size: 16
            })
          })]
        }), _jsx("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: 3,
            marginBottom: 4
          },
          children: DAY_LABELS.map(d => _jsx("div", {
            style: {
              textAlign: 'center',
              fontFamily: 'Unbounded,cursive',
              fontSize: 9,
              fontWeight: 700,
              color: 'var(--text-sec)',
              padding: '4px 0'
            },
            children: d
          }, d))
        }), _jsxs("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            gap: 3
          },
          children: [Array(firstDow).fill(null).map((_, i) => _jsx("div", {}, 'e' + i)), Array.from({
            length: daysInMonth
          }, (_, i) => i + 1).map(day => {
            const ds = fmtDs(day);
            const dayLess = scheduleLessons.filter(l => l.date === ds);
            const isToday = ds === today;
            const isSel = ds === selDate;
            const planned = dayLess.filter(l => l.status === 'planned').length;
            const done = dayLess.filter(l => isFinalLesson(l)).length;
            return _jsxs("div", {
              onClick: () => setSelDate(ds),
              style: {
                border: 'var(--border)',
                borderRadius: 4,
                cursor: 'pointer',
                padding: '6px 4px',
                minHeight: 52,
                position: 'relative',
                background: isSel ? 'var(--black)' : isToday ? 'var(--yellow)' : 'var(--white)',
                color: isSel ? 'var(--yellow)' : 'var(--black)',
                boxShadow: isSel ? 'none' : 'var(--shadow)',
                transition: 'transform .1s'
              },
              children: [_jsx("div", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontSize: 13,
                  fontWeight: 900,
                  lineHeight: 1
                },
                children: day
              }), _jsxs("div", {
                style: {
                  marginTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                },
                children: [planned > 0 && _jsx("div", {
                  style: {
                    background: isSel ? 'var(--yellow)' : 'var(--blue)',
                    color: isSel ? 'var(--black)' : '#fff',
                    borderRadius: 3,
                    padding: '1px 4px',
                    fontSize: 9,
                    fontFamily: 'Unbounded,cursive',
                    fontWeight: 700
                  },
                  children: planned
                }), done > 0 && _jsxs("div", {
                  style: {
                    background: isSel ? 'rgba(255,255,255,.3)' : 'var(--border-light)',
                    color: isSel ? 'var(--yellow)' : 'var(--text-sec)',
                    borderRadius: 3,
                    padding: '1px 4px',
                    fontSize: 9,
                    fontFamily: 'Unbounded,cursive',
                    fontWeight: 700
                  },
                  children: ["\u2713", done]
                })]
              })]
            }, day);
          })]
        }), _jsxs("div", {
          style: {
            marginTop: 16,
            border: 'var(--border)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 'var(--shadow)'
          },
          children: [_jsxs("div", {
            style: {
              background: 'var(--black)',
              color: 'var(--yellow)',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            },
            children: [_jsx("span", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 11,
                fontWeight: 900
              },
              children: selDateObj.toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'long'
              }).toUpperCase()
            }), _jsx("button", {
              className: "btn btn-sm",
              style: {
                padding: '4px 8px',
                fontSize: 9,
                background: 'var(--yellow)',
                color: 'var(--black)',
                boxShadow: 'none'
              },
              onClick: () => setModal({
                type: 'lesson',
                payload: {
                  date: selDate
                }
              }),
              children: "+ \u0423\u0420\u041E\u041A"
            })]
          }), selDayLessons.length === 0 ? _jsx("div", {
            style: {
              padding: '16px',
              textAlign: 'center',
              fontFamily: 'Unbounded,cursive',
              fontSize: 11,
              color: 'var(--text-muted)'
            },
            children: "\u041D\u0435\u0442 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 + \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C"
          }) : selDayLessons.map(l => _jsxs("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderTop: '1.5px solid var(--border-light)'
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 14,
                fontWeight: 900,
                minWidth: 48,
                color: isFinalLesson(l) ? 'var(--text-muted)' : 'var(--black)'
              },
              children: l.time
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsx("div", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontSize: 10,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: isFinalLesson(l) ? 'var(--text-muted)' : 'var(--black)'
                },
                children: getLessonName(l)
              }), _jsx("span", {
                style: {
                  fontSize: 9,
                  background: l.type === 'group' ? 'var(--blue)' : 'var(--yellow)',
                  color: l.type === 'group' ? '#fff' : 'var(--black)',
                  padding: '1px 5px',
                  borderRadius: 3,
                  fontFamily: 'Unbounded,cursive',
                  fontWeight: 700
                },
                children: l.type === 'group' ? 'ГР' : 'ИНД'
              }), l.status !== 'planned' && _jsx("span", {
                style: {
                  marginLeft: 4,
                  fontSize: 9,
                  background: LESSON_STATUS[l.status]?.color || '#ccc',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: 3,
                  fontFamily: 'Unbounded,cursive',
                  fontWeight: 700
                },
                children: LESSON_STATUS[l.status]?.label || l.status
              })]
            }), l.status === 'planned' ? _jsx("button", {
              className: "btn btn-sm btn-green",
              onClick: () => setModal({
                type: 'attendance',
                payload: l
              }),
              children: _jsx(IcoPlay, {
                size: 13
              })
            }) : l.status === 'completed' ? _jsx("button", {
              className: "btn btn-sm btn-white",
              onClick: () => setModal({
                type: 'attendance',
                payload: l
              }),
              children: _jsx(IcoCheck, {
                size: 13
              })
            }) : _jsx("button", {
              className: "btn btn-sm btn-white",
              onClick: () => setModal({
                type: 'lessonStatus',
                payload: l
              }),
              children: LESSON_STATUS[l.status]?.label || l.status
            }), _jsx("button", {
              style: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'var(--text-muted)'
              },
              onClick: () => setModal({
                type: 'lessonStatus',
                payload: l
              }),
              children: _jsx(IcoEdit, {
                size: 15
              })
            }), _jsx("button", {
              style: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'var(--text-muted)'
              },
              onClick: e => delLesson(l.id, e),
              children: _jsx(IcoTrash, {
                size: 15
              })
            })]
          }, l.id))]
        })]
      });
    };
    return _jsxs("div", {
      children: [_jsxs("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 20,
            fontWeight: 900
          },
          children: "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435"
        }), _jsxs("div", {
          style: {
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          },
          children: [_jsx("button", {
            className: "btn btn-sm btn-white",
            style: {
              padding: '6px 10px'
            },
            title: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 PDF",
            onClick: () => setModal({
              type: 'schedExport'
            }),
            children: _jsx(IcoPrint, {
              size: 15
            })
          }), _jsxs("div", {
            className: "toggle-row",
            style: {
              marginBottom: 0,
              width: 'auto'
            },
            children: [_jsx("button", {
              className: `toggle-opt ${schedView === 'week' ? 'active' : ''}`,
              style: {
                padding: '6px 14px',
                fontSize: 10
              },
              onClick: () => setSchedView('week'),
              children: "\u041D\u0435\u0434\u0435\u043B\u044F"
            }), _jsx("button", {
              className: `toggle-opt ${schedView === 'month' ? 'active' : ''}`,
              style: {
                padding: '6px 14px',
                fontSize: 10
              },
              onClick: () => setSchedView('month'),
              children: "\u041C\u0435\u0441\u044F\u0446"
            })]
          })]
        })]
      }), students.length === 0 && lessons.length === 0 && _jsx(EmptyState, {
        title: "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E\u0435",
        text: "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u0443\u0440\u043E\u043A. \u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u0437\u0434\u0435\u0441\u044C \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C.",
        action: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430",
        onAction: () => setModal({
          type: 'student',
          payload: null
        })
      }), (() => {
        const getWeekDatesForFilter = offset => {
          const today = new Date();
          const dow = today.getDay() || 7;
          const mon = new Date(today);
          mon.setDate(today.getDate() - dow + 1 + offset * 7);
          return Array.from({
            length: 7
          }, (_, i) => {
            const d = new Date(mon);
            d.setDate(mon.getDate() + i);
            return localDateString(d);
          });
        };
        const wDates = schedView === 'week' ? getWeekDatesForFilter(weekOffset) : null;
        const weekLessonsAll = wDates ? lessons.filter(l => wDates.includes(l.date)) : lessons;
        const weekSubjects = [...new Set(weekLessonsAll.map(l => getLessonSubject(l, groups)))].filter(s => SUBJECTS.includes(s));
        return _jsxs("div", {
          className: "day-strip",
          style: {
            marginBottom: 14
          },
          children: [_jsx("button", {
            className: `day-btn ${schedSubject === 'all' ? 'active' : ''}`,
            onClick: () => setSchedSubject('all'),
            style: {
              minWidth: 82
            },
            children: _jsx("span", {
              className: "day-btn-name",
              children: "\u0412\u0441\u0435"
            })
          }), weekSubjects.map(subject => _jsx("button", {
            className: `day-btn ${schedSubject === subject ? 'active' : ''}`,
            onClick: () => setSchedSubject(subject),
            style: {
              minWidth: 96
            },
            children: _jsx("span", {
              className: "day-btn-name",
              children: subject
            })
          }, subject))]
        });
      })(), schedView === 'week' ? _jsx(WeekView, {}) : _jsx(MonthView, {})]
    });
  };

  // STUDENTS PAGE
  const PageStudents = () => {
    const view = studentsView;
    const setView = setStudentsView;
    const q = studentsQ;
    const setQ = setStudentsQ;
    const debtOnly = studentsDebtOnly;
    const setDebtOnly = setStudentsDebtOnly;
    const showArchived = studentsShowArchived;
    const setShowArchived = setStudentsShowArchived;
    const subjectFilter = studentsSubjectFilter;
    const setSubjectFilter = setStudentsSubjectFilter;
    const availableSubjects = SUBJECTS.filter(subject => view === 'students' ? students.some(s => (!s.archived || showArchived) && (s.subjects || []).includes(subject)) : groups.some(g => g.subject === subject));
    const filtered = students.filter(s => {
      if (!showArchived && s.archived) return false;
      if (debtOnly && s.balance >= 0) return false;
      if (subjectFilter !== 'all' && !(s.subjects || []).includes(subjectFilter)) return false;
      return s.name.toLowerCase().includes(q.toLowerCase());
    });
    const filteredGroups = groups.filter(g => {
      if (subjectFilter !== 'all' && g.subject !== subjectFilter) return false;
      return g.name.toLowerCase().includes(q.toLowerCase());
    });
    return _jsxs("div", {
      children: [_jsxs("div", {
        className: "page-title",
        children: [view === 'students' ? 'Ученики' : 'Группы', _jsx("button", {
          className: "btn btn-sm btn-black",
          onClick: () => setModal({
            type: view === 'students' ? 'student' : 'group',
            payload: null
          }),
          children: _jsx(IcoPlus, {
            size: 14
          })
        })]
      }), _jsxs("div", {
        className: "toggle-row",
        children: [_jsx("button", {
          className: `toggle-opt ${view === 'students' ? 'active' : ''}`,
          onClick: () => setView('students'),
          children: "\u0423\u0447\u0435\u043D\u0438\u043A\u0438"
        }), _jsx("button", {
          className: `toggle-opt ${view === 'groups' ? 'active' : ''}`,
          onClick: () => setView('groups'),
          children: "\u0413\u0440\u0443\u043F\u043F\u044B"
        })]
      }), _jsxs("div", {
        style: {
          position: 'relative',
          marginBottom: 10
        },
        children: [_jsx(IcoSearch, {
          size: 16,
          cls: "",
          style: {
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: .5
          }
        }), _jsx("input", {
          className: "input",
          style: {
            paddingLeft: 36
          },
          placeholder: "\u041F\u043E\u0438\u0441\u043A...",
          value: q,
          onChange: e => setQ(e.target.value)
        })]
      }), _jsxs("div", {
        className: "day-strip",
        style: {
          marginBottom: 12
        },
        children: [_jsx("button", {
          className: `day-btn ${subjectFilter === 'all' ? 'active' : ''}`,
          onClick: () => setSubjectFilter('all'),
          style: {
            minWidth: 82
          },
          children: _jsx("span", {
            className: "day-btn-name",
            children: "\u0412\u0441\u0435"
          })
        }), availableSubjects.map(subject => _jsx("button", {
          className: `day-btn ${subjectFilter === subject ? 'active' : ''}`,
          onClick: () => setSubjectFilter(subject),
          style: {
            minWidth: 96
          },
          children: _jsx("span", {
            className: "day-btn-name",
            children: subject
          })
        }, subject))]
      }), view === 'students' ? _jsxs(_Fragment, {
        children: [_jsx("button", {
          className: `btn btn-sm btn-full ${debtOnly ? 'btn-red' : 'btn-white'}`,
          style: {
            marginBottom: 8
          },
          onClick: () => setDebtOnly(!debtOnly),
          children: debtOnly ? '✕ Только должники' : 'Только должники'
        }), _jsx("button", {
          className: `btn btn-sm btn-full ${showArchived ? 'btn-black' : 'btn-white'}`,
          style: {
            marginBottom: 14
          },
          onClick: () => setShowArchived(!showArchived),
          children: showArchived ? 'Скрыть архив' : 'Показать архив'
        }), filtered.map(s => _jsxs("div", {
          className: "student-item",
          onClick: () => setModal({
            type: 'studentDetail',
            payload: s
          }),
          style: {
            cursor: 'pointer',
            opacity: s.archived ? .55 : 1
          },
          children: [_jsxs("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontWeight: 900,
                fontSize: 13,
                marginBottom: 4
              },
              children: s.name
            }), _jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)'
              },
              children: [money(s.rate), "/\u0443\u0440\u043E\u043A \xB7 ", s.phone]
            }), _jsx("div", {
              style: {
                display: 'flex',
                gap: 5,
                flexWrap: 'wrap',
                marginTop: 5
              },
              children: (s.subjects || ['История']).map(subject => _jsx("span", {
                className: "lesson-tag",
                style: {
                  background: subjectColor(subject),
                  color: subjectTagText(subject)
                },
                children: subject
              }, subject))
            }), _jsxs("div", {
              style: {
                marginTop: 6
              },
              children: [_jsxs("span", {
                className: `badge ${s.balance < 0 ? 'badge-red' : s.balance > 0 ? 'badge-green' : 'badge-yellow'}`,
                children: [s.balance > 0 ? '+' : '', money(s.balance)]
              }), (s.packageLessons || 0) > 0 && _jsxs("span", {
                className: "badge badge-green",
                style: {
                  marginLeft: 6
                },
                children: [s.packageLessons, " \u0437\u0430\u043D."]
              }), s.archived && _jsx("span", {
                className: "badge badge-yellow",
                style: {
                  marginLeft: 6
                },
                children: "\u0410\u0420\u0425\u0418\u0412"
              })]
            })]
          }), _jsxs("div", {
            style: {
              display: 'flex',
              gap: 6,
              marginLeft: 8,
              alignItems: 'center'
            },
            children: [s.phone && _jsx("a", {
              href: `tel:${s.phone}`,
              title: s.phone,
              className: "btn btn-sm btn-white",
              style: {
                padding: '4px 7px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              },
              onClick: e => e.stopPropagation(),
              children: _jsx(IcoPhone, {
                size: 14
              })
            }), _jsxs("button", {
              title: s.tgId ? 'Открыть в Telegram' : 'Написать',
              className: `btn btn-sm ${s.tgId ? 'btn-blue' : 'btn-white'}`,
              style: {
                padding: '4px 8px',
                fontSize: 9,
                gap: 4
              },
              onClick: e => {
                e.stopPropagation();
                if (s.tgId) {
                  const id = String(s.tgId).trim();
                  window.open(id.startsWith('@') ? `https://t.me/${id.slice(1)}` : `https://t.me/${id}`, '_blank');
                } else {
                  setModal({
                    type: 'message',
                    payload: {
                      student: s
                    }
                  });
                }
              },
              children: [s.tgId ? _jsx(IcoTg, {
                size: 12
              }) : null, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C"]
            }), _jsx("button", {
              style: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6
              },
              onClick: e => {
                e.stopPropagation();
                setModal({
                  type: 'student',
                  payload: s
                });
              },
              children: _jsx(IcoEdit, {
                size: 18
              })
            }), _jsx("button", {
              style: {
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6
              },
              onClick: e => {
                e.stopPropagation();
                delStudent(s.id);
              },
              children: _jsx(IcoTrash, {
                size: 18
              })
            })]
          })]
        }, s.id)), filtered.length === 0 && _jsx(EmptyState, {
          title: students.length ? 'Ничего не найдено' : 'Добавьте первого ученика',
          text: students.length ? 'Измените фильтр или строку поиска.' : 'Карточка ученика хранит ставку, предметы, долги, ДЗ и историю занятий.',
          action: "\u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A",
          onAction: () => setModal({
            type: 'student',
            payload: null
          })
        })]
      }) : _jsxs(_Fragment, {
        children: [filteredGroups.map(g => {
          const memberNames = g.studentIds.map(id => students.find(s => s.id === id)?.name).filter(Boolean);
          const futureCount = lessons.filter(l => l.type === 'group' && l.targetId === g.id && l.status === 'planned').length;
          return _jsxs("div", {
            className: "student-item",
            style: {
              opacity: g.archived ? .6 : 1,
              cursor: 'pointer'
            },
            onClick: () => setModal({
              type: 'groupDetail',
              payload: g
            }),
            children: [_jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [_jsxs("div", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontWeight: 900,
                  fontSize: 13,
                  marginBottom: 4
                },
                children: [g.emoji && _jsx("span", {
                  style: {
                    marginRight: 6,
                    fontSize: 16
                  },
                  children: g.emoji
                }), g.name, " ", g.archived && _jsx("span", {
                  className: "badge badge-yellow",
                  children: "\u0410\u0420\u0425\u0418\u0412"
                })]
              }), _jsx("span", {
                className: "lesson-tag",
                style: {
                  background: subjectColor(g.subject),
                  color: subjectTagText(g.subject)
                },
                children: g.subject || 'История'
              }), _jsx("div", {
                style: {
                  fontSize: 11,
                  color: '#666',
                  lineHeight: 1.5
                },
                children: memberNames.join(', ') || 'Нет учеников'
              }), _jsxs("div", {
                style: {
                  fontSize: 10,
                  color: '#666',
                  marginTop: 4
                },
                children: ["\u0411\u0443\u0434\u0443\u0449\u0438\u0445 \u0443\u0440\u043E\u043A\u043E\u0432: ", futureCount]
              })]
            }), _jsxs("div", {
              style: {
                display: 'flex',
                gap: 8,
                marginLeft: 8
              },
              children: [_jsx("button", {
                style: {
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 6
                },
                onClick: e => {
                  e.stopPropagation();
                  setModal({
                    type: 'group',
                    payload: g
                  });
                },
                children: _jsx(IcoEdit, {
                  size: 18
                })
              }), _jsx("button", {
                style: {
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 6
                },
                onClick: e => {
                  e.stopPropagation();
                  delGroup(g.id);
                },
                children: _jsx(IcoTrash, {
                  size: 18
                })
              })]
            })]
          }, g.id);
        }), filteredGroups.length === 0 && _jsx(EmptyState, {
          title: groups.length ? 'Группы не найдены' : 'Групп пока нет',
          text: groups.length ? 'Попробуйте другой поиск или предмет.' : 'Группы удобны для мини-классов: укажите учеников, предмет и разные ставки.',
          action: "\u041D\u043E\u0432\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
          onAction: () => setModal({
            type: 'group',
            payload: null
          })
        })]
      })]
    });
  };

  // FINANCE PAGE (with full analytics, deduplication-safe)
  const PageFinance = () => {
    const [finTab, setFinTab] = useState('control'); // 'control' | 'analytics'
    const [analyticsPeriod, setAnalyticsPeriod] = useState('current_month');
    const [txStudentFilter, setTxStudentFilter] = useState('all');
    const [txTypeFilter, setTxTypeFilter] = useState('all');
    const [customFrom, setCustomFrom] = useState(() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
    });
    const [customTo, setCustomTo] = useState(getTodayDate);
    const activeStudents = students.filter(s => !s.archived);
    const debt = activeStudents.filter(s => s.balance < 0).reduce((s, st) => s + Math.abs(st.balance), 0);
    const prepaid = activeStudents.filter(s => s.balance > 0).reduce((s, st) => s + st.balance, 0);
    const debtors = activeStudents.filter(s => s.balance < 0).sort((a, b) => a.balance - b.balance);
    const lowPackages = students.filter(s => !s.archived && (s.packageLessons || 0) > 0 && (s.packageLessons || 0) <= 1);
    const historyTxs = txs.filter(tx => {
      if (txStudentFilter !== 'all' && tx.studentId !== Number(txStudentFilter)) return false;
      if (txTypeFilter !== 'all' && tx.type !== txTypeFilter) return false;
      return true;
    });

    // Safe quick-pay: only pays the exact outstanding debt (not arbitrary amount)
    const quickPay = studentId => {
      const s = students.find(st => st.id === studentId);
      if (!s || s.balance >= 0) return;
      saveTx({
        studentId,
        type: 'payment',
        amount: Math.abs(s.balance),
        date: getTodayDate(),
        comment: 'Быстрая оплата долга'
      });
    };

    // ── ANALYTICS ───────────────────────────────────────────────────────────
    const getPeriodBounds = p => {
      const now = new Date();
      const y = now.getFullYear(),
        m = now.getMonth();
      if (p === 'current_month') return {
        start: new Date(y, m, 1),
        end: new Date(y, m + 1, 0, 23, 59, 59)
      };
      if (p === 'last_month') return {
        start: new Date(y, m - 1, 1),
        end: new Date(y, m, 0, 23, 59, 59)
      };
      if (p === 'next_month') return {
        start: new Date(y, m + 1, 1),
        end: new Date(y, m + 2, 0, 23, 59, 59)
      };
      if (p === 'custom') return {
        start: new Date(customFrom + 'T00:00:00'),
        end: new Date(customTo + 'T23:59:59')
      };
      return {
        start: new Date(2000, 0, 1),
        end: new Date(2100, 0, 1)
      };
    };
    const bounds = getPeriodBounds(analyticsPeriod);
    const inBounds = ds => {
      const d = new Date(ds + 'T00:00:00');
      return d >= bounds.start && d <= bounds.end;
    };

    // All completed lessons
    const completedLessons = lessons.filter(l => l.status === 'completed' || l.status === 'no_show');
    const periodLessons = lessons.filter(l => inBounds(l.date));
    const periodCompleted = periodLessons.filter(l => l.status === 'completed' || l.status === 'no_show');
    const periodPlanned = periodLessons.filter(l => l.status === 'planned');

    // Compute per-student stats across ALL time (for skip rate)
    const studentStats = useMemo(() => {
      const stats = {};
      students.forEach(s => {
        stats[s.id] = {
          scheduled: 0,
          attended: 0,
          skipped: 0,
          earned: 0,
          lost: 0
        };
      });
      completedLessons.forEach(lesson => {
        const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
        const ls = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
        ls.forEach(s => {
          if (!stats[s.id]) return;
          const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
          const present = lesson.status !== 'no_show' && lesson.attendance?.[s.id] !== false;
          stats[s.id].scheduled++;
          if (present) {
            stats[s.id].attended++;
            stats[s.id].earned += rate;
          } else {
            stats[s.id].skipped++;
            stats[s.id].lost += rate;
          }
        });
      });
      return stats;
    }, [completedLessons, students, groups]);

    // Average skip rate across all students (weighted by scheduled lessons)
    const totalScheduled = Object.values(studentStats).reduce((s, v) => s + v.scheduled, 0);
    const totalSkipped = Object.values(studentStats).reduce((s, v) => s + v.skipped, 0);
    const avgSkipRate = totalScheduled > 0 ? totalSkipped / totalScheduled : 0;

    // Period income (actual from txs)
    const periodTxs = txs.filter(tx => inBounds(tx.date));
    const actualPayments = periodTxs.filter(tx => tx.type === 'payment' && tx.kind !== 'attendance').reduce((s, t) => s + t.amount, 0);
    const actualCharges = periodTxs.filter(tx => tx.type === 'charge').reduce((s, t) => s + t.amount, 0);

    // Period earned from completed lessons (gross)
    let periodEarned = 0,
      periodLost = 0;
    periodCompleted.forEach(lesson => {
      const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
      const ls = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
      ls.forEach(s => {
        const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
        const present = lesson.status !== 'no_show' && lesson.attendance?.[s.id] !== false;
        if (present) periodEarned += rate;else periodLost += rate;
      });
    });

    // Projected income for planned lessons in period
    let projIdeal = 0,
      projRealistic = 0;
    periodPlanned.forEach(lesson => {
      const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
      const ls = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
      ls.forEach(s => {
        const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
        projIdeal += rate;
        projRealistic += rate * (1 - avgSkipRate);
      });
    });
    const totalIdeal = periodEarned + projIdeal;
    const totalRealistic = periodEarned + projRealistic;

    // Per-student table for period
    const studentPeriodStats = useMemo(() => {
      const st = {};
      students.forEach(s => {
        st[s.id] = {
          earned: 0,
          lost: 0,
          scheduled: 0,
          attended: 0
        };
      });
      periodCompleted.forEach(lesson => {
        const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
        const ls = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
        ls.forEach(s => {
          if (!st[s.id]) return;
          const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
          const present = lesson.status !== 'no_show' && lesson.attendance?.[s.id] !== false;
          st[s.id].scheduled++;
          if (present) {
            st[s.id].attended++;
            st[s.id].earned += rate;
          } else {
            st[s.id].lost += rate;
          }
        });
      });
      return st;
    }, [periodCompleted, students, groups]);
    const studentRows = students.map(s => ({
      ...s,
      ...studentPeriodStats[s.id]
    })).filter(s => s.scheduled > 0).sort((a, b) => b.earned - a.earned);
    const Stat = ({
      label,
      value,
      color,
      sub
    }) => _jsxs("div", {
      className: `metric-card ${color ? 'accent' : ''}`,
      style: color ? {
        '--metric-bg': color
      } : {},
      children: [_jsx("div", {
        className: "metric-label",
        children: label
      }), _jsx("div", {
        className: "metric-value",
        children: value
      }), sub && _jsx("div", {
        className: "metric-sub",
        children: sub
      })]
    });
    const ControlTab = () => _jsxs("div", {
      children: [_jsxs("div", {
        className: "crm-dashboard",
        children: [_jsx(Stat, {
          label: "\u0414\u043E\u043B\u0433\u0438",
          value: `${debt.toLocaleString()} ₽`,
          color: "#dc4c4c",
          sub: `${debtors.length} чел.`
        }), _jsx(Stat, {
          label: "\u041F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u044B",
          value: `${prepaid.toLocaleString()} ₽`,
          color: "#2f9e68"
        }), _jsx(Stat, {
          label: "\u0424\u0430\u043A\u0442 \u043E\u043F\u043B\u0430\u0442",
          value: `${actualPayments.toLocaleString()} ₽`,
          sub: "\u0437\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434"
        }), _jsx(Stat, {
          label: "\u0421\u043F\u0438\u0441\u0430\u043D\u043E \u0443\u0440\u043E\u043A\u043E\u0432",
          value: `${actualCharges.toLocaleString()} ₽`,
          sub: "\u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F"
        }), _jsx(Stat, {
          label: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437",
          value: `${Math.round(totalRealistic).toLocaleString()} ₽`,
          color: "#2f6fed",
          sub: "\u0440\u0435\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u043E"
        }), _jsx(Stat, {
          label: "\u041F\u043E\u0442\u0435\u0440\u0438",
          value: `${periodLost.toLocaleString()} ₽`,
          color: "#8a5a44",
          sub: "\u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0438"
        })]
      }), students.length === 0 && txs.length === 0 && _jsx(EmptyState, {
        title: "\u0424\u0438\u043D\u0430\u043D\u0441\u044B \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439",
        text: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430, \u043F\u0440\u043E\u0432\u0435\u0434\u0438\u0442\u0435 \u0443\u0440\u043E\u043A \u0438\u043B\u0438 \u0432\u043D\u0435\u0441\u0438\u0442\u0435 \u043E\u043F\u043B\u0430\u0442\u0443. \u0414\u043E\u043B\u0433\u0438, \u043F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u044B \u0438 \u043F\u0440\u043E\u0433\u043D\u043E\u0437 \u0441\u043E\u0431\u0435\u0440\u0443\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.",
        action: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430",
        onAction: () => setModal({
          type: 'student',
          payload: null
        })
      }), debtors.length > 0 && _jsxs(_Fragment, {
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 12,
            fontWeight: 900,
            marginBottom: 10
          },
          children: "\u0414\u041E\u041B\u0416\u041D\u0418\u041A\u0418"
        }), debtors.map(s => _jsxs("div", {
          className: "finance-panel",
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px',
            marginBottom: 8,
            background: 'var(--bg-danger)'
          },
          children: [_jsxs("div", {
            style: {
              flex: 1
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontWeight: 900,
                fontSize: 12
              },
              children: s.name
            }), _jsxs("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontSize: 16,
                fontWeight: 900,
                color: 'var(--red)'
              },
              children: [s.balance, " \u20BD"]
            })]
          }), _jsx("button", {
            className: "btn btn-sm btn-white",
            style: {
              padding: '6px 9px',
              fontSize: 14
            },
            title: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435",
            onClick: () => setModal({
              type: 'message',
              payload: {
                student: s
              }
            }),
            children: _jsx(IcoEdit, {
              size: 14
            })
          }), _jsx("button", {
            className: "btn btn-sm btn-green",
            onClick: () => quickPay(s.id),
            children: "\u041E\u043F\u043B\u0430\u0442\u0438\u043B"
          })]
        }, s.id))]
      }), lowPackages.length > 0 && _jsxs(_Fragment, {
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 12,
            fontWeight: 900,
            marginBottom: 10
          },
          children: "\u0410\u0411\u041E\u041D\u0415\u041C\u0415\u041D\u0422\u042B \u041D\u0410 \u0418\u0421\u0425\u041E\u0414\u0415"
        }), lowPackages.map(s => _jsxs("div", {
          className: "finance-panel",
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px',
            marginBottom: 8,
            background: 'var(--bg-subtle)'
          },
          children: [_jsxs("div", {
            style: {
              flex: 1
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontWeight: 900,
                fontSize: 12
              },
              children: s.name
            }), _jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)'
              },
              children: ["\u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ", s.packageLessons, " \u0437\u0430\u043D\u044F\u0442\u0438\u0435"]
            })]
          }), _jsx("button", {
            className: "btn btn-sm btn-blue",
            onClick: () => setModal({
              type: 'package',
              payload: {
                student: s
              }
            }),
            children: "\u041F\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u044C"
          })]
        }, s.id))]
      }), _jsxs("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px 0 10px'
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 12,
            fontWeight: 900
          },
          children: "\u0418\u0421\u0422\u041E\u0420\u0418\u042F"
        }), _jsxs("button", {
          className: "btn btn-sm btn-black",
          onClick: () => setModal({
            type: 'transaction',
            payload: null
          }),
          children: [_jsx(IcoPlus, {
            size: 13
          }), " \u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F"]
        })]
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 10
        },
        children: [_jsxs("select", {
          className: "input",
          value: txStudentFilter,
          onChange: e => setTxStudentFilter(e.target.value),
          style: {
            fontSize: 11,
            padding: '8px'
          },
          children: [_jsx("option", {
            value: "all",
            children: "\u0412\u0441\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438"
          }), students.map(s => _jsx("option", {
            value: s.id,
            children: s.name
          }, s.id))]
        }), _jsxs("select", {
          className: "input",
          value: txTypeFilter,
          onChange: e => setTxTypeFilter(e.target.value),
          style: {
            fontSize: 11,
            padding: '8px'
          },
          children: [_jsx("option", {
            value: "all",
            children: "\u0412\u0441\u0435 \u0442\u0438\u043F\u044B"
          }), _jsx("option", {
            value: "payment",
            children: "\u041E\u043F\u043B\u0430\u0442\u044B"
          }), _jsx("option", {
            value: "charge",
            children: "\u0421\u043F\u0438\u0441\u0430\u043D\u0438\u044F"
          })]
        })]
      }), historyTxs.slice(0, 50).map(tx => {
        const s = students.find(st => st.id === tx.studentId);
        return _jsxs("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            padding: '10px 0',
            borderBottom: '1.5px solid #e0e0e0'
          },
          children: [_jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontWeight: 700,
                fontSize: 12
              },
              children: s?.name || 'Удалён'
            }), _jsxs("div", {
              style: {
                fontSize: 10,
                color: '#888'
              },
              children: [fmtDate(tx.date), " \xB7 ", tx.comment]
            })]
          }), _jsxs("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 6
            },
            children: [_jsxs("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontWeight: 900,
                fontSize: 14,
                color: tx.type === 'payment' ? 'var(--green)' : 'var(--red)',
                minWidth: 72,
                textAlign: 'right'
              },
              children: [tx.type === 'payment' ? '+' : '-', money(tx.amount)]
            }), !tx.lessonId && _jsxs(_Fragment, {
              children: [_jsx("button", {
                style: {
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4
                },
                onClick: () => setModal({
                  type: 'transaction',
                  payload: tx
                }),
                children: _jsx(IcoEdit, {
                  size: 15
                })
              }), _jsx("button", {
                style: {
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#999'
                },
                onClick: () => delTx(tx),
                children: _jsx(IcoTrash, {
                  size: 15
                })
              })]
            })]
          })]
        }, tx.id);
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginTop: 14
        },
        children: [_jsx("button", {
          className: "btn btn-sm btn-white btn-full",
          onClick: exportCsv,
          children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV"
        }), _jsx("button", {
          className: "btn btn-sm btn-red btn-full",
          onClick: resetDemoData,
          children: "\u0421\u0431\u0440\u043E\u0441 \u0434\u0435\u043C\u043E"
        })]
      }), _jsxs("div", {
        className: "finance-panel",
        style: {
          marginTop: 8,
          background: 'var(--bg-subtle)'
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 10,
            fontWeight: 900,
            marginBottom: 4
          },
          children: "\u0411\u042D\u041A\u0410\u041F \u0414\u0410\u041D\u041D\u042B\u0425"
        }), _jsx("div", {
          style: {
            fontSize: 11,
            color: '#666',
            marginBottom: 10,
            lineHeight: 1.5
          },
          children: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0439 \u0431\u044D\u043A\u0430\u043F \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0438 \u043C\u043E\u0433\u0443\u0442 \u043F\u0440\u043E\u043F\u0430\u0441\u0442\u044C \u043F\u0440\u0438 \u043E\u0447\u0438\u0441\u0442\u043A\u0435 \u043A\u044D\u0448\u0430."
        }), _jsxs("div", {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8
          },
          children: [_jsxs("button", {
            className: "btn btn-sm btn-black btn-full",
            onClick: exportJson,
            children: [_jsx(IcoPrint, {
              size: 13
            }), " \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0431\u044D\u043A\u0430\u043F"]
          }), _jsxs("button", {
            className: "btn btn-sm btn-white btn-full",
            onClick: importJson,
            children: [_jsx(IcoPlus, {
              size: 13
            }), " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0431\u044D\u043A\u0430\u043F"]
          })]
        })]
      })]
    });
    const AnalyticsTab = () => _jsxs("div", {
      children: [_jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
          marginBottom: 6
        },
        children: [[['last_month', 'Прошлый мес.'], ['current_month', 'Этот месяц'], ['next_month', 'Следующий'], ['all_time', 'Всё время']].map(([v, l]) => _jsx("button", {
          onClick: () => setAnalyticsPeriod(v),
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 9,
            fontWeight: 700,
            padding: '8px 6px',
            border: 'var(--border)',
            borderRadius: 4,
            cursor: 'pointer',
            background: analyticsPeriod === v ? 'var(--black)' : 'var(--white)',
            color: analyticsPeriod === v ? 'var(--yellow)' : 'var(--black)',
            boxShadow: analyticsPeriod === v ? 'none' : 'var(--shadow)'
          },
          children: l
        }, v)), _jsx("button", {
          onClick: () => setAnalyticsPeriod('custom'),
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 9,
            fontWeight: 700,
            padding: '8px 6px',
            border: 'var(--border)',
            borderRadius: 4,
            cursor: 'pointer',
            gridColumn: '1/-1',
            background: analyticsPeriod === 'custom' ? 'var(--blue)' : 'var(--white)',
            color: analyticsPeriod === 'custom' ? '#fff' : 'var(--black)',
            boxShadow: analyticsPeriod === 'custom' ? 'none' : 'var(--shadow)'
          },
          children: "\u0421\u0432\u043E\u0439 \u043F\u0435\u0440\u0438\u043E\u0434"
        })]
      }), analyticsPeriod === 'custom' && _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 12,
          padding: '10px',
          border: 'var(--border)',
          borderRadius: 4,
          background: 'var(--bg-subtle)'
        },
        children: [_jsxs("div", {
          children: [_jsx("label", {
            className: "label",
            style: {
              fontSize: 9
            },
            children: "\u0421"
          }), _jsx("input", {
            className: "input",
            type: "date",
            value: customFrom,
            onChange: e => setCustomFrom(e.target.value),
            style: {
              padding: '6px 8px',
              fontSize: 12
            }
          })]
        }), _jsxs("div", {
          children: [_jsx("label", {
            className: "label",
            style: {
              fontSize: 9
            },
            children: "\u041F\u043E"
          }), _jsx("input", {
            className: "input",
            type: "date",
            value: customTo,
            onChange: e => setCustomTo(e.target.value),
            style: {
              padding: '6px 8px',
              fontSize: 12
            }
          })]
        })]
      }), _jsx("div", {
        style: {
          marginBottom: 16
        }
      }), _jsx("div", {
        style: {
          fontFamily: 'Unbounded,cursive',
          fontSize: 11,
          fontWeight: 900,
          marginBottom: 10
        },
        children: "\u0418\u0422\u041E\u0413 \u041F\u0415\u0420\u0418\u041E\u0414\u0410"
      }), _jsxs("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 10
        },
        children: [_jsx(Stat, {
          label: "\u0417\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E",
          value: `${periodEarned.toLocaleString()} ₽`,
          color: "var(--green)"
        }), _jsx(Stat, {
          label: "\u041F\u043E\u0442\u0435\u0440\u044F\u043D\u043E \u043D\u0430 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0445",
          value: `${periodLost.toLocaleString()} ₽`,
          color: "var(--red)"
        })]
      }), _jsxs("div", {
        style: {
          fontFamily: 'Unbounded,cursive',
          fontSize: 11,
          fontWeight: 900,
          marginBottom: 10,
          marginTop: 16
        },
        children: ["\u041F\u0420\u041E\u0413\u041D\u041E\u0417 (\u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0435\u0441\u044F ", periodPlanned.length, " \u0443\u0440\u043E\u043A\u043E\u0432)"]
      }), _jsxs("div", {
        className: "forecast-grid",
        children: [_jsxs("div", {
          className: "forecast-card good",
          children: [_jsx("div", {
            className: "metric-label",
            children: "\u0418\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0433\u043D\u043E\u0437"
          }), _jsxs("div", {
            className: "metric-value",
            children: [projIdeal.toLocaleString(), " \u20BD"]
          }), _jsxs("div", {
            className: "metric-sub",
            children: ["\u0415\u0441\u043B\u0438 \u0432\u0441\u0435 \u043F\u0440\u0438\u0434\u0443\u0442. \u0418\u0442\u043E\u0433\u043E: ", totalIdeal.toLocaleString(), " \u20BD"]
          })]
        }), _jsxs("div", {
          className: "forecast-card warn",
          children: [_jsx("div", {
            className: "metric-label",
            children: "\u0420\u0435\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u0433\u043D\u043E\u0437"
          }), _jsxs("div", {
            className: "metric-value",
            children: [Math.round(projRealistic).toLocaleString(), " \u20BD"]
          }), _jsxs("div", {
            className: "metric-sub",
            children: ["\u0421 \u0443\u0447\u0435\u0442\u043E\u043C \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u043E\u0432 ", Math.round(avgSkipRate * 100), "%. \u0418\u0442\u043E\u0433\u043E: ", Math.round(totalRealistic).toLocaleString(), " \u20BD"]
          })]
        })]
      }), _jsxs("div", {
        className: "finance-panel",
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 10,
            fontWeight: 900,
            marginBottom: 6
          },
          children: "\u0421\u0422\u0410\u0422\u0418\u0421\u0422\u0418\u041A\u0410 \u041F\u0420\u041E\u041F\u0423\u0421\u041A\u041E\u0412 (\u0432\u0441\u0435 \u0432\u0440\u0435\u043C\u044F)"
        }), _jsxs("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
          children: [_jsxs("div", {
            children: [_jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)'
              },
              children: [totalScheduled, " \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E"]
            }), _jsxs("div", {
              style: {
                fontSize: 11,
                color: 'var(--text-sec)'
              },
              children: [totalSkipped, " \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043E"]
            })]
          }), _jsxs("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 28,
              fontWeight: 900,
              color: avgSkipRate > 0.2 ? 'var(--red)' : avgSkipRate > 0.1 ? '#b9892f' : 'var(--green)'
            },
            children: [Math.round(avgSkipRate * 100), "%"]
          })]
        }), _jsx("div", {
          style: {
            marginTop: 10,
            height: 10,
            background: 'var(--border-light)',
            borderRadius: 999,
            overflow: 'hidden'
          },
          children: _jsx("div", {
            style: {
              height: '100%',
              width: `${Math.min(avgSkipRate * 100, 100)}%`,
              background: avgSkipRate > 0.2 ? 'var(--red)' : avgSkipRate > 0.1 ? '#b9892f' : 'var(--green)',
              transition: 'width .3s'
            }
          })
        })]
      }), _jsx("div", {
        style: {
          fontFamily: 'Unbounded,cursive',
          fontSize: 11,
          fontWeight: 900,
          marginBottom: 10
        },
        children: "\u041F\u041E \u0423\u0427\u0415\u041D\u0418\u041A\u0410\u041C (\u043F\u0435\u0440\u0438\u043E\u0434)"
      }), analyticsPeriod !== 'all_time' && (() => {
        const weekMap = {};
        periodCompleted.forEach(lesson => {
          const d = new Date(lesson.date + 'T00:00:00');
          const dow = d.getDay() || 7;
          const mon = new Date(d);
          mon.setDate(d.getDate() - dow + 1);
          const key = mon.toISOString().slice(0, 10);
          const grp = lesson.type === 'group' ? groups.find(g => g.id === lesson.targetId) : null;
          const ls = lesson.type === 'individual' ? [students.find(s => s.id === lesson.targetId)].filter(Boolean) : grp?.studentIds.map(id => students.find(s => s.id === id)).filter(Boolean) || [];
          ls.forEach(s => {
            const rate = grp?.rateOverrides?.[s.id] ?? s.rate;
            const present = lesson.status !== 'no_show' && lesson.attendance?.[s.id] !== false;
            if (present) weekMap[key] = (weekMap[key] || 0) + rate;
          });
        });
        const weeks = Object.keys(weekMap).sort();
        if (weeks.length < 2) return null;
        const maxVal = Math.max(...weeks.map(w => weekMap[w]), 1);
        const barW = Math.max(18, Math.min(34, Math.floor(220 / weeks.length) - 6));
        const gap = 8;
        const h = 58;
        const svgW = Math.max(360, weeks.length * (barW + gap));
        return _jsxs("div", {
          className: "finance-panel finance-chart-panel",
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 10,
              fontWeight: 900,
              marginBottom: 10
            },
            children: "\u0414\u041E\u0425\u041E\u0414 \u041F\u041E \u041D\u0415\u0414\u0415\u041B\u042F\u041C"
          }), _jsx("div", {
            className: "finance-chart-scroll",
            children: _jsx("svg", {
              width: "100%",
              viewBox: `0 0 ${Math.max(svgW, 200)} ${h + 32}`,
              className: "finance-chart-svg weekly",
              style: {
                minWidth: `${svgW}px`
              },
              children: weeks.map((w, i) => {
                const val = weekMap[w] || 0;
                const barH = val / maxVal * h;
                const x = i * (barW + gap);
                const weekNum = new Date(w + 'T00:00:00');
                const label = weekNum.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'numeric'
                });
                return _jsxs("g", {
                  children: [_jsx("rect", {
                    x: x,
                    y: h - barH,
                    width: barW,
                    height: barH,
                    rx: 3,
                    fill: "var(--blue)",
                    opacity: 0.85
                  }), val > 0 && _jsxs("text", {
                    x: x + barW / 2,
                    y: h - barH - 4,
                    textAnchor: "middle",
                    fontSize: "8",
                    fontFamily: "Unbounded,cursive",
                    fontWeight: "700",
                    fill: "var(--black)",
                    children: [Math.round(val / 1000), "\u043A"]
                  }), _jsx("text", {
                    x: x + barW / 2,
                    y: h + 14,
                    textAnchor: "middle",
                    fontSize: "8",
                    fontFamily: "Martian Mono,monospace",
                    fill: "var(--text-sec)",
                    children: label
                  })]
                }, w);
              })
            })
          })]
        });
      })(), (() => {
        const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const dayCounts = [0, 0, 0, 0, 0, 0, 0];
        periodLessons.forEach(l => {
          let dow = new Date(l.date + 'T00:00:00').getDay();
          dow = dow === 0 ? 6 : dow - 1;
          dayCounts[dow]++;
        });
        const max = Math.max(...dayCounts, 1);
        const barW = 24,
          gap = 10,
          h = 64;
        const svgW = Math.max(360, dayNames.length * (barW + gap));
        return _jsxs("div", {
          className: "finance-panel finance-chart-panel",
          children: [_jsx("div", {
            style: {
              fontFamily: 'Unbounded,cursive',
              fontSize: 10,
              fontWeight: 900,
              marginBottom: 10
            },
            children: "\u041D\u0410\u0413\u0420\u0423\u0417\u041A\u0410 \u041F\u041E \u0414\u041D\u042F\u041C"
          }), _jsx("svg", {
            width: "100%",
            viewBox: `0 0 ${svgW} ${h + 24}`,
            className: "finance-chart-svg days",
            children: dayCounts.map((c, i) => {
              const barH = c / max * h;
              const x = i * (barW + gap);
              const clr = i >= 5 ? 'var(--red)' : 'var(--blue)';
              return _jsxs("g", {
                children: [_jsx("rect", {
                  x: x,
                  y: h - barH,
                  width: barW,
                  height: barH,
                  rx: 3,
                  fill: clr,
                  opacity: 0.85
                }), _jsx("text", {
                  x: x + barW / 2,
                  y: h - barH - 4,
                  textAnchor: "middle",
                  fontSize: "9",
                  fontFamily: "Unbounded,cursive",
                  fontWeight: "700",
                  fill: "currentColor",
                  children: c || ''
                }), _jsx("text", {
                  x: x + barW / 2,
                  y: h + 14,
                  textAnchor: "middle",
                  fontSize: "9",
                  fontFamily: "Unbounded,cursive",
                  fontWeight: "700",
                  fill: "var(--text-sec)",
                  children: dayNames[i]
                })]
              }, i);
            })
          })]
        });
      })(), studentRows.length === 0 ? _jsx("div", {
        style: {
          textAlign: 'center',
          padding: 20,
          color: 'var(--text-muted)',
          fontFamily: 'Unbounded,cursive',
          fontSize: 11
        },
        children: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434"
      }) : studentRows.map(s => {
        const skipRate = s.scheduled > 0 ? s.skipped / s.scheduled : 0;
        const ownSkip = studentStats[s.id];
        const allTimeSkip = ownSkip.scheduled > 0 ? ownSkip.skipped / ownSkip.scheduled : 0;
        return _jsxs("div", {
          className: "finance-panel",
          style: {
            padding: '10px 12px'
          },
          children: [_jsxs("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8
            },
            children: [_jsx("div", {
              style: {
                fontFamily: 'Unbounded,cursive',
                fontWeight: 900,
                fontSize: 12
              },
              children: s.name
            }), _jsxs("div", {
              style: {
                display: 'flex',
                gap: 6
              },
              children: [_jsxs("span", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--green)'
                },
                children: [s.earned.toLocaleString(), " \u20BD"]
              }), s.lost > 0 && _jsxs("span", {
                style: {
                  fontFamily: 'Unbounded,cursive',
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--red)'
                },
                children: ["-", s.lost.toLocaleString(), " \u20BD"]
              })]
            })]
          }), _jsxs("div", {
            style: {
              display: 'flex',
              gap: 6,
              fontSize: 10,
              color: 'var(--text-sec)',
              marginBottom: 6
            },
            children: [_jsxs("span", {
              children: [s.attended, "/", s.scheduled, " \u0443\u0440\u043E\u043A\u043E\u0432"]
            }), _jsx("span", {
              children: "\xB7"
            }), _jsxs("span", {
              style: {
                color: allTimeSkip > 0.2 ? 'var(--red)' : allTimeSkip > 0.1 ? '#FF8C00' : 'var(--green)',
                fontWeight: 700
              },
              children: ["\u043F\u0440\u043E\u043F\u0443\u0441\u043A ", Math.round(allTimeSkip * 100), "% (\u0432\u0441\u0451 \u0432\u0440\u0435\u043C\u044F)"]
            })]
          }), _jsx("div", {
            style: {
              height: 6,
              background: 'var(--border-light)',
              borderRadius: 3,
              border: '1px solid var(--border-dashed)',
              overflow: 'hidden'
            },
            children: _jsxs("div", {
              style: {
                height: '100%',
                display: 'flex'
              },
              children: [_jsx("div", {
                style: {
                  width: `${s.scheduled > 0 ? s.attended / s.scheduled * 100 : 0}%`,
                  background: 'var(--green)',
                  transition: 'width .3s'
                }
              }), _jsx("div", {
                style: {
                  flex: 1,
                  background: 'var(--red)'
                }
              })]
            })
          })]
        }, s.id);
      })]
    });
    return _jsxs("div", {
      children: [_jsxs("div", {
        className: "page-title",
        children: ["\u0424\u0438\u043D\u0430\u043D\u0441\u044B", _jsxs("div", {
          style: {
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          },
          children: [_jsxs("button", {
            className: "btn btn-sm btn-green",
            onClick: () => setModal({
              type: 'transaction',
              payload: null
            }),
            children: [_jsx(IcoWallet, {
              size: 13
            }), " \u041D\u043E\u0432\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430"]
          }), _jsxs("button", {
            className: "btn btn-sm btn-white",
            onClick: () => setModal({
              type: 'deletions'
            }),
            children: ["\u0416\u0443\u0440\u043D\u0430\u043B ", deletionLog.length ? `· ${deletionLog.length}` : '']
          })]
        })]
      }), _jsxs("div", {
        className: "toggle-row",
        style: {
          marginBottom: 16
        },
        children: [_jsx("button", {
          className: `toggle-opt ${finTab === 'control' ? 'active' : ''}`,
          onClick: () => setFinTab('control'),
          children: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C"
        }), _jsx("button", {
          className: `toggle-opt ${finTab === 'analytics' ? 'active' : ''}`,
          onClick: () => setFinTab('analytics'),
          children: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430"
        })]
      }), finTab === 'control' ? _jsx(ControlTab, {}) : _jsx(AnalyticsTab, {})]
    });
  };
  if (!loaded) return _jsx("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      fontFamily: 'Unbounded,cursive',
      fontSize: 14
    },
    children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
  });
  return _jsxs("div", {
    children: [_jsx(UndoToast, {
      pendingUndo: pendingUndo,
      onUndo: handleUndo
    }), _jsxs("div", {
      className: "main",
      children: [tab === 'today' && _jsx(PageToday, {}), tab === 'schedule' && _jsx(PageSchedule, {}), tab === 'students' && _jsx(PageStudents, {}), tab === 'finance' && _jsx(PageFinance, {})]
    }), (tab === 'today' || tab === 'schedule') && _jsxs(_Fragment, {
      children: [fabOpen && _jsx("div", {
        className: "fab-overlay",
        onClick: () => setFabOpen(false)
      }), fabOpen && _jsxs("div", {
        className: "fab-menu",
        children: [_jsxs("div", {
          className: "fab-item",
          style: {
            background: 'var(--yellow)',
            color: 'var(--black)'
          },
          onClick: () => {
            setFabOpen(false);
            setModal({
              type: 'lesson',
              payload: {
                date: tab === 'schedule' ? selDate : getTodayDate()
              }
            });
          },
          children: [_jsx(IcoCal, {
            size: 16
          }), " \u041D\u043E\u0432\u044B\u0439 \u0443\u0440\u043E\u043A"]
        }), _jsxs("div", {
          className: "fab-item",
          style: {
            background: 'var(--green)',
            color: 'var(--black)'
          },
          onClick: () => {
            setFabOpen(false);
            setModal({
              type: 'student',
              payload: null
            });
          },
          children: [_jsx(IcoUsers, {
            size: 16
          }), " \u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A"]
        }), _jsxs("div", {
          className: "fab-item",
          style: {
            background: 'var(--blue)',
            color: '#fff'
          },
          onClick: () => {
            setFabOpen(false);
            setModal({
              type: 'transaction',
              payload: null
            });
          },
          children: [_jsx(IcoWallet, {
            size: 16
          }), " \u041D\u043E\u0432\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430"]
        })]
      }), _jsx("div", {
        className: "fab",
        onClick: () => setFabOpen(!fabOpen),
        style: {
          transform: fabOpen ? 'rotate(45deg)' : 'none',
          transition: 'transform .2s'
        },
        children: _jsx(IcoPlus, {
          size: 28
        })
      })]
    }), showSearch && _jsx(SearchModal, {
      students: students,
      groups: groups,
      lessons: lessons,
      onClose: () => setShowSearch(false),
      onOpenStudent: s => setModal({
        type: 'studentDetail',
        payload: s
      }),
      onOpenGroup: g => setModal({
        type: 'groupDetail',
        payload: g
      }),
      onOpenLesson: l => setModal({
        type: l.status === 'planned' || l.status === 'completed' ? 'attendance' : 'lessonStatus',
        payload: l
      })
    }), showNotifs && _jsx("div", {
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 199
      },
      onClick: () => setShowNotifs(false),
      children: _jsxs("div", {
        onClick: e => e.stopPropagation(),
        style: {
          position: 'fixed',
          right: 16,
          top: 60,
          width: 300,
          maxHeight: 400,
          overflowY: 'auto',
          background: 'var(--white)',
          border: 'var(--border)',
          borderRadius: 4,
          boxShadow: 'var(--shadow-lg)',
          zIndex: 200,
          padding: 8
        },
        children: [_jsx("div", {
          style: {
            fontFamily: 'Unbounded,cursive',
            fontSize: 10,
            fontWeight: 900,
            padding: '8px 8px 4px',
            color: 'var(--text-sec)'
          },
          children: "\u0423\u0412\u0415\u0414\u041E\u041C\u041B\u0415\u041D\u0418\u042F"
        }), notifications.length === 0 ? _jsx("div", {
          style: {
            padding: 16,
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--text-muted)'
          },
          children: "\u0412\u0441\u0451 \u043E\u0442\u043B\u0438\u0447\u043D\u043E"
        }) : notifications.map(n => _jsxs("div", {
          style: {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            padding: '8px',
            borderBottom: '1px solid var(--border-light)'
          },
          children: [_jsx("span", {
            style: {
              fontSize: 18
            },
            children: n.icon
          }), _jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontSize: 12,
                fontWeight: 600
              },
              children: n.text
            }), n.sub && _jsx("div", {
              style: {
                fontSize: 10,
                color: 'var(--text-sec)'
              },
              children: n.sub
            })]
          })]
        }, n.id))]
      })
    }), _jsx("nav", {
      className: "navbar",
      children: [{
        id: 'today',
        icon: _jsx(IcoHome, {}),
        label: 'Сегодня'
      }, {
        id: 'schedule',
        icon: _jsx(IcoCal, {}),
        label: 'Расписание'
      }, {
        id: 'students',
        icon: _jsx(IcoUsers, {}),
        label: 'Ученики'
      }, {
        id: 'finance',
        icon: _jsx(IcoWallet, {}),
        label: 'Финансы'
      }].map(({
        id,
        icon,
        label
      }) => _jsxs("button", {
        className: `nav-btn ${tab === id ? 'active' : ''}`,
        onClick: () => {
          setTab(id);
          setFabOpen(false);
        },
        children: [icon, _jsx("span", {
          children: label
        })]
      }, id))
    }), modal?.type === 'lesson' && _jsx(LessonModal, {
      students: students,
      groups: groups,
      initialDate: modal.payload?.date || getTodayDate(),
      initialStudentId: modal.payload?.studentId || null,
      initialType: modal.payload?.initialType || null,
      initialTargetId: modal.payload?.targetId || null,
      initialTime: modal.payload?.time || null,
      lessonToEdit: modal.payload?.lesson || null,
      onClose: () => setModal(null),
      onSave: (data, options) => saveLesson(data, modal.payload?.lesson?.id || null, options)
    }), modal?.type === 'attendance' && _jsx(AttendanceModal, {
      lesson: modal.payload,
      students: students,
      groups: groups,
      onClose: () => setModal(null),
      onSave: saveAttendance
    }), modal?.type === 'student' && _jsx(StudentModal, {
      student: modal.payload,
      onClose: () => setModal(null),
      onSave: saveStudent
    }), modal?.type === 'studentDetail' && _jsx(StudentDetailModal, {
      student: modal.payload,
      students: students,
      lessons: lessons,
      txs: txs,
      groups: groups,
      onClose: () => setModal(null),
      onEdit: () => setModal({
        type: 'student',
        payload: modal.payload
      }),
      onPay: studentId => {
        const s = students.find(st => st.id === studentId);
        if (s?.balance < 0) saveTx({
          studentId,
          type: 'payment',
          amount: Math.abs(s.balance),
          date: getTodayDate(),
          comment: 'Оплата долга'
        });
      },
      onLesson: studentId => setModal({
        type: 'lesson',
        payload: {
          date: getTodayDate(),
          studentId
        }
      }),
      onGroupLesson: (group, date, time) => setModal({
        type: 'lesson',
        payload: {
          date,
          time,
          initialType: 'group',
          targetId: group.id
        }
      }),
      onPackage: student => setModal({
        type: 'package',
        payload: {
          student
        }
      }),
      onMessage: student => setModal({
        type: 'message',
        payload: {
          student
        }
      }),
      onArchive: archiveStudent
    }), modal?.type === 'transaction' && _jsx(TransactionModal, {
      tx: modal.payload,
      students: students,
      onClose: () => setModal(null),
      onSave: saveTx
    }), modal?.type === 'group' && _jsx(GroupModal, {
      group: modal.payload,
      students: students,
      onClose: () => setModal(null),
      onSave: saveGroup
    }), modal?.type === 'groupDetail' && _jsx(GroupDetailModal, {
      group: modal.payload,
      students: students,
      lessons: lessons,
      onClose: () => setModal(null),
      onEdit: () => setModal({
        type: 'group',
        payload: modal.payload
      })
    }), modal?.type === 'lessonStatus' && _jsx(LessonStatusModal, {
      lesson: modal.payload,
      onClose: () => setModal(null),
      onStatus: setLessonStatus,
      onDelete: delLesson,
      onReschedule: lesson => setModal({
        type: 'reschedule',
        payload: {
          lesson
        }
      })
    }), modal?.type === 'package' && _jsx(PackageModal, {
      student: modal.payload.student,
      onClose: () => setModal(null),
      onSave: savePackage
    }), modal?.type === 'reschedule' && _jsx(RescheduleModal, {
      lesson: modal.payload.lesson,
      onClose: () => setModal(null),
      onSave: rescheduleLesson
    }), modal?.type === 'message' && modal.payload?.student && _jsx(MessageModal, {
      student: modal.payload.student,
      lesson: modal.payload.lesson || null,
      groups: groups,
      lessons: lessons,
      templates: customTemplates,
      onSaveTemplate: setCustomTemplates,
      onClose: () => setModal(null)
    }), modal?.type === 'schedExport' && _jsx(ScheduleExportModal, {
      lessons: lessons,
      onExport: exportSchedulePdf,
      onClose: () => setModal(null)
    }), modal?.type === 'tips' && _jsx(TipsModal, {
      onClose: () => setModal(null)
    }), modal?.type === 'deletions' && _jsx(DeleteJournalModal, {
      entries: deletionLog,
      onRestore: restoreDeletion,
      onClose: () => setModal(null)
    })]
  });
}

// Shared LessonCard component
function LessonCard({
  lesson,
  name,
  onEdit,
  onAttend,
  onStatus,
  onDelete,
  compact = false
}) {
  const done = isFinalLesson(lesson);
  const statusInfo = LESSON_STATUS[lesson.status] || LESSON_STATUS.planned;
  return _jsxs("div", {
    className: "lesson-card",
    style: {
      opacity: done ? .75 : 1
    },
    children: [lesson.lessonNote && _jsx("span", {
      className: "lesson-note-dot",
      title: "\u0415\u0441\u0442\u044C \u043F\u043E\u043C\u0435\u0442\u043A\u0430"
    }), _jsxs("div", {
      className: "lesson-time",
      style: {
        background: done ? 'var(--done-bg)' : 'var(--black)',
        minWidth: compact ? 52 : 62,
        fontSize: compact ? 12 : 14
      },
      children: [_jsx("span", {
        children: lesson.time
      }), lesson.duration && lesson.duration !== 60 && _jsx("span", {
        style: {
          fontSize: 8,
          color: '#bbb',
          marginTop: 1
        },
        children: lesson.duration < 60 ? `${lesson.duration}м` : lesson.duration === 90 ? '1.5ч' : lesson.duration === 120 ? '2ч' : `${lesson.duration}м`
      }), done && _jsx("span", {
        style: {
          fontSize: 8,
          color: 'var(--text-sec)',
          marginTop: 2,
          textAlign: 'center'
        },
        children: statusInfo.label
      })]
    }), _jsxs("div", {
      className: "lesson-body",
      children: [_jsx("div", {
        className: "lesson-name",
        style: {
          fontSize: compact ? 11 : 12
        },
        children: name
      }), _jsxs("div", {
        children: [_jsx("span", {
          className: "lesson-tag",
          style: {
            background: lesson.type === 'group' ? 'var(--blue)' : 'var(--yellow)',
            color: lesson.type === 'group' ? '#fff' : 'var(--black)'
          },
          children: lesson.type === 'group' ? 'Группа' : 'Инд.'
        }), _jsx("span", {
          className: "lesson-tag",
          style: {
            marginLeft: 5,
            background: subjectColor(lesson.subject || 'История'),
            color: subjectTagText(lesson.subject || 'История')
          },
          children: lesson.subject || 'История'
        }), lesson.seriesId && _jsx("span", {
          className: "lesson-tag",
          style: {
            marginLeft: 5,
            background: 'var(--white)',
            color: 'var(--black)'
          },
          children: "\u0441\u0435\u0440\u0438\u044F"
        }), lesson.homework && _jsx("span", {
          className: "lesson-tag",
          style: {
            marginLeft: 5,
            background: 'var(--green)',
            color: 'var(--black)'
          },
          children: "\u0414\u0417"
        }), lesson.status !== 'planned' && _jsx("span", {
          className: "lesson-tag",
          style: {
            marginLeft: 5,
            background: statusInfo.color,
            color: '#fff'
          },
          children: statusInfo.label
        })]
    }), _jsxs("div", {
      className: "lesson-actions",
      children: [lesson.status === 'planned' ? _jsx("button", {
        className: "btn btn-sm btn-green",
        onClick: e => {
          e.stopPropagation();
          onAttend();
        },
        children: _jsx(IcoPlay, {
          size: 14
        })
      }) : lesson.status === 'completed' ? _jsx("button", {
        className: "btn btn-sm btn-white",
        onClick: e => {
          e.stopPropagation();
          onAttend();
        },
        children: _jsx(IcoCheck, {
          size: 14
        })
      }) : _jsx("button", {
        className: "btn btn-sm btn-white",
        onClick: e => {
          e.stopPropagation();
          onStatus();
        },
        children: _jsx("span", {
          style: {
            maxWidth: 96,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          },
          children: statusInfo.label
        })
      }), _jsx("button", {
        style: {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 6,
          color: '#555'
        },
        onClick: e => {
          e.stopPropagation();
          onEdit();
        },
        children: _jsx(IcoEdit, {
          size: 16
        })
      }), _jsx("button", {
        style: {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 6,
          color: '#555'
        },
        onClick: e => {
          e.stopPropagation();
          onStatus();
        },
        children: _jsx(IcoRepeat, {
          size: 16
        })
      }), _jsx("button", {
        style: {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 6,
          color: '#999'
        },
        onClick: onDelete,
        children: _jsx(IcoTrash, {
          size: 16
        })
      })]
    })]
  })]
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(App, {}));

// ── PWA: Service Worker Registration ──
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
