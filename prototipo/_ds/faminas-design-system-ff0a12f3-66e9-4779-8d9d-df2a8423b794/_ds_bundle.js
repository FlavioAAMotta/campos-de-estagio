/* @ds-bundle: {"format":4,"namespace":"FAMINASDesignSystem_ff0a12","components":[],"sourceHashes":{"ui_kits/mapa-estagios/MapaEstagios.jsx":"b24bf26b9f7d","ui_kits/mapa-estagios/components.jsx":"043f3cd096f1","ui_kits/portal-docentes/DocentesDashboard.jsx":"96d664060e99","ui_kits/portal-docentes/components.jsx":"043f3cd096f1","ui_kits/siga-preceptores/Auth.jsx":"3d255639f872","ui_kits/siga-preceptores/Dashboard.jsx":"b93419a381e8","ui_kits/siga-preceptores/Landing.jsx":"da794090a03e","ui_kits/siga-preceptores/components.jsx":"043f3cd096f1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FAMINASDesignSystem_ff0a12 = window.FAMINASDesignSystem_ff0a12 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/mapa-estagios/MapaEstagios.jsx
try { (() => {
/* global React, Icon, Button, Card, Badge */
// Mapa Interativo de Estágios — recreation of discentes_faminas (App.jsx)
// Filters panel + Leaflet map with sample cenários de prática in Belo Horizonte.

const LOCAIS = [{
  nome: "UBS Centro-Sul",
  end: "Av. Augusto de Lima, 1000 - Centro",
  lat: -19.9245,
  lng: -43.9352,
  disc: [{
    d: "Saúde Coletiva",
    p: "8º",
    prec: "Dra. Helena Vasconcelos",
    est: 12,
    turno: "Manhã"
  }]
}, {
  nome: "Hospital das Clínicas UFMG",
  end: "Av. Prof. Alfredo Balena, 110 - Santa Efigênia",
  lat: -19.9183,
  lng: -43.9345,
  disc: [{
    d: "Clínica Médica",
    p: "9º",
    prec: "Dr. Marcos V. Reis",
    est: 8,
    turno: "Tarde"
  }, {
    d: "Cirurgia Geral",
    p: "10º",
    prec: "Dr. Otávio Pinto",
    est: 6,
    turno: "Manhã"
  }]
}, {
  nome: "Maternidade Odete Valadares",
  end: "Av. do Contorno, 9494 - Prado",
  lat: -19.9320,
  lng: -43.9610,
  disc: [{
    d: "Ginecologia e Obstetrícia",
    p: "9º",
    prec: "Dra. Beatriz Nunes",
    est: 10,
    turno: "Manhã"
  }]
}, {
  nome: "UPA Leste",
  end: "R. Conselheiro Rocha, 850 - Sagrada Família",
  lat: -19.9020,
  lng: -43.9180,
  disc: [{
    d: "Urgência e Emergência",
    p: "10º",
    prec: "Dr. Rafael Costa",
    est: 9,
    turno: "Noite"
  }]
}];
const DISCIPLINAS = ["Todas as disciplinas", "Saúde Coletiva", "Clínica Médica", "Cirurgia Geral", "Ginecologia e Obstetrícia", "Urgência e Emergência"];
const PERIODOS = ["Todos os períodos", "8º", "9º", "10º"];
function Select({
  label,
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--foreground)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: e => onChange(e.target.value),
    style: {
      height: 40,
      width: "100%",
      border: "1px solid var(--border)",
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      padding: "0 36px 0 12px",
      fontSize: 14,
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
      appearance: "none",
      cursor: "pointer",
      outline: "none"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 12,
      top: 0,
      height: 40,
      display: "flex",
      alignItems: "center",
      pointerEvents: "none",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16
  }))));
}
function Stat({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      padding: 12,
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: ".06em",
      color: "var(--text-subtle)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 20,
      color: "var(--heading)",
      marginTop: 2
    }
  }, value));
}
function MapaEstagios() {
  const mapRef = React.useRef(null);
  const [disc, setDisc] = React.useState(DISCIPLINAS[0]);
  const [per, setPer] = React.useState(PERIODOS[0]);
  const filtered = LOCAIS.filter(l => l.disc.some(d => (disc === DISCIPLINAS[0] || d.d === disc) && (per === PERIODOS[0] || d.p === per)));
  const totalAtividades = filtered.reduce((t, l) => t + l.disc.length, 0);
  const totalEst = filtered.reduce((t, l) => t + l.disc.reduce((s, d) => s + d.est, 0), 0);
  React.useEffect(() => {
    if (!window.L || !mapRef.current) return;
    const map = window.L.map(mapRef.current, {
      scrollWheelZoom: false
    }).setView([-19.918, -43.94], 12);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 18
    }).addTo(map);
    const pin = window.L.divIcon({
      className: "",
      html: `<div style="width:28px;height:28px;background:#D00C64;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28]
    });
    LOCAIS.forEach(l => {
      const discHtml = l.disc.map(d => `
        <div style="background:#fff;border:1px solid #D8DCE3;border-radius:8px;padding:8px 10px;margin-top:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <span style="background:#6097CA;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px">${d.d}</span>
            <span style="font-size:11px;color:#6B7385">${d.p} · ${d.turno}</span>
          </div>
          <div style="font-size:12px;color:#373E4D;margin-top:6px">${d.prec}</div>
          <div style="font-size:12px;color:#2D2A6F;font-weight:600;margin-top:2px">${d.est} estudantes</div>
        </div>`).join("");
      window.L.marker([l.lat, l.lng], {
        icon: pin
      }).addTo(map).bindPopup(`
        <div style="font-family:'Public Sans',sans-serif;min-width:240px">
          <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;color:#2D2A6F;font-size:15px;border-bottom:1px solid #eee;padding-bottom:6px">${l.nome}</div>
          <div style="background:#EAF1F8;border-radius:8px;padding:8px 10px;margin-top:8px;font-size:12px;color:#373E4D"><strong>Endereço:</strong> ${l.end}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-top:10px"><strong style="color:#2A303C;font-size:13px">Disciplinas</strong><span style="background:#D00C64;color:#fff;font-size:11px;padding:1px 7px;border-radius:999px">${l.disc.length}</span></div>
          ${discHtml}
        </div>`, {
        maxWidth: 320
      });
    });
    return () => map.remove();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--gray-50)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--white)",
      borderBottom: "4px solid var(--faminas-pink)",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-faminas.png",
    alt: "FAMINAS",
    style: {
      height: 38
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "1px solid var(--border)",
      paddingLeft: 18
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 23,
      color: "var(--faminas-blue)",
      margin: 0,
      lineHeight: 1.2
    }
  }, "Mapa Interativo de Est\xE1gios"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--faminas-light)",
      margin: "3px 0 0",
      fontWeight: 500
    }
  }, "Cen\xE1rios de pr\xE1tica \xB7 Belo Horizonte"))), /*#__PURE__*/React.createElement(Badge, {
    variant: "default",
    style: {
      padding: "7px 14px",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), " ", filtered.length, " locais"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: 32,
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      overflow: "hidden",
      padding: 0,
      alignSelf: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gradient-faminas)",
      color: "#fff",
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 18,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16
    }
  }, "Filtros")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Disciplina",
    options: DISCIPLINAS,
    value: disc,
    onChange: setDisc
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Per\xEDodo",
    options: PERIODOS,
    value: per,
    onChange: setPer
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      setDisc(DISCIPLINAS[0]);
      setPer(PERIODOS[0]);
    },
    style: {
      borderColor: "var(--faminas-pink)",
      color: "var(--faminas-pink)"
    }
  }, "Limpar Filtros"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--gray-50)",
      borderRadius: "var(--radius-md)",
      padding: 14,
      border: "1px solid var(--border)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "LOCAIS",
    value: filtered.length
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "ATIVIDADES",
    value: totalAtividades
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "ESTUDANTES",
    value: totalEst
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "REGISTROS",
    value: LOCAIS.length
  })))), /*#__PURE__*/React.createElement(Card, {
    style: {
      overflow: "hidden",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, var(--faminas-light) 0%, var(--faminas-pink) 100%)",
      color: "#fff",
      padding: "16px 18px",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 18,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16
    }
  }, "Cen\xE1rios de Pr\xE1tica em Belo Horizonte")), /*#__PURE__*/React.createElement("div", {
    ref: mapRef,
    style: {
      height: 560,
      width: "100%"
    }
  }))));
}
window.MapaEstagios = MapaEstagios;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mapa-estagios/MapaEstagios.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mapa-estagios/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// Shared primitives for the FAMINAS / SIGA UI kits.
// Faithful, mainly-cosmetic recreations of the shadcn/ui components used in
// preceptor-point, profs-faminas and discentes_faminas.

// ---- Icon (Lucide, imperatively mounted so React never fights the SVG) ----
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color,
  className = "",
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (host && window.lucide) {
      host.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      host.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      ...style
    }
  });
}

// ---- Button ----
function Button({
  variant = "default",
  size = "default",
  children,
  className = "",
  style = {},
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    whiteSpace: "nowrap",
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: "pointer",
    transition: "all .15s ease",
    lineHeight: 1
  };
  const sizes = {
    sm: {
      height: 36,
      padding: "0 12px",
      fontSize: 13
    },
    default: {
      height: 40,
      padding: "0 16px",
      fontSize: 14
    },
    lg: {
      height: 46,
      padding: "0 28px",
      fontSize: 16
    },
    icon: {
      height: 40,
      width: 40,
      padding: 0
    }
  };
  const variants = {
    default: {
      background: "var(--primary)",
      color: "#fff",
      boxShadow: "var(--shadow-sm)"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "2px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)"
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff"
    },
    link: {
      background: "none",
      color: "var(--primary)",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      padding: 0,
      height: "auto",
      boxShadow: "none"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    default: {
      background: "var(--primary-hover)"
    },
    accent: {
      background: "var(--faminas-pink-700)"
    },
    outline: {
      borderColor: "var(--primary)",
      color: "var(--primary)"
    },
    ghost: {
      background: "var(--gray-100)"
    }
  }[variant] || {} : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle,
      ...style
    },
    className: className
  }, props), children);
}

// ---- Card ----
function Card({
  children,
  className = "",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, children);
}
function CardTitle({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--heading)",
      margin: 0,
      lineHeight: 1.2,
      ...style
    }
  }, children);
}
function CardDescription({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)",
      margin: 0,
      lineHeight: 1.45,
      ...style
    }
  }, children);
}
function CardContent({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      paddingTop: 0,
      ...style
    }
  }, children);
}

// ---- Badge ----
function Badge({
  variant = "default",
  children,
  style = {}
}) {
  const variants = {
    default: {
      background: "var(--faminas-blue)",
      color: "#fff"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    light: {
      background: "var(--faminas-light)",
      color: "#fff"
    },
    secondary: {
      background: "var(--gray-100)",
      color: "var(--gray-600)"
    },
    success: {
      background: "var(--success-bg)",
      color: "var(--success)"
    },
    warning: {
      background: "var(--warning-bg)",
      color: "var(--warning)"
    },
    destructive: {
      background: "var(--destructive-bg)",
      color: "var(--destructive)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      fontWeight: 600,
      padding: "3px 11px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1.4,
      ...variants[variant],
      ...style
    }
  }, children);
}

// ---- Input + Label ----
function Label({
  children,
  htmlFor,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--foreground)",
      marginBottom: 6,
      ...style
    }
  }, children);
}
function Input({
  style = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 40,
      width: "100%",
      border: "1px solid var(--border)",
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      padding: "0 12px",
      fontSize: 14,
      color: "var(--foreground)",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      outline: "none",
      ...(focus ? {
        borderColor: "var(--primary)",
        boxShadow: "0 0 0 3px rgba(30,64,175,.15)"
      } : {}),
      ...style
    }
  }, props));
}
Object.assign(window, {
  Icon,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Label,
  Input
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mapa-estagios/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-docentes/DocentesDashboard.jsx
try { (() => {
/* global React, Icon, Button, Card, Badge, Input */
// Planilha Interativa de Docentes — recreation of profs-faminas (App.jsx)
// Stats dashboard + search + filters + expandable docente list.

const STATS = [{
  label: "Docentes",
  value: 83,
  icon: "users",
  color: "var(--faminas-blue)"
}, {
  label: "Doutores",
  value: 41,
  icon: "graduation-cap",
  color: "var(--faminas-pink)"
}, {
  label: "Mestres",
  value: 36,
  icon: "book-open",
  color: "var(--faminas-light)"
}, {
  label: "Especialistas",
  value: 5,
  icon: "award",
  color: "#E0A33E"
}, {
  label: "Publicações",
  value: 638,
  icon: "file-text",
  color: "#2E9E78"
}];
const DOCENTES = [{
  nome: "Ana Carolina Lima",
  tit: "Doutora",
  area: "Clínica Médica",
  regime: "Integral",
  pub: 32,
  exp: 14,
  lattes: true
}, {
  nome: "Rafael Mendes Costa",
  tit: "Mestre",
  area: "Anatomia",
  regime: "Parcial",
  pub: 11,
  exp: 9,
  lattes: true
}, {
  nome: "Juliana Prado Alves",
  tit: "Especialista",
  area: "Pediatria",
  regime: "Horista",
  pub: 4,
  exp: 6,
  lattes: false
}, {
  nome: "Marcos Vinícius Reis",
  tit: "Doutor",
  area: "Cirurgia Geral",
  regime: "Integral",
  pub: 47,
  exp: 21,
  lattes: true
}, {
  nome: "Beatriz Carvalho Nunes",
  tit: "Doutora",
  area: "Saúde Coletiva",
  regime: "Integral",
  pub: 28,
  exp: 12,
  lattes: true
}, {
  nome: "Otávio Ramires Pinto",
  tit: "Mestre",
  area: "Farmacologia",
  regime: "Parcial",
  pub: 9,
  exp: 8,
  lattes: true
}];
const TIT_VARIANT = {
  "Doutora": "default",
  "Doutor": "default",
  "Mestre": "light",
  "Especialista": "secondary"
};
function DocentesDashboard() {
  const [query, setQuery] = React.useState("");
  const [tit, setTit] = React.useState("Todas");
  const [open, setOpen] = React.useState(null);
  const filtered = DOCENTES.filter(d => (tit === "Todas" || d.tit.startsWith(tit)) && d.nome.toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--gray-50)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--white)",
      borderBottom: "4px solid var(--faminas-pink)",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "22px 32px",
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-faminas.png",
    alt: "FAMINAS",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "1px solid var(--border)",
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 24,
      color: "var(--faminas-blue)",
      margin: 0,
      letterSpacing: "-0.01em",
      lineHeight: 1.2
    }
  }, "Planilha Interativa de Docentes"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--faminas-light)",
      margin: "4px 0 0",
      fontWeight: 500
    }
  }, "Corpo docente \xB7 Curso de Medicina")))), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1180,
      margin: "0 auto",
      padding: "32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 16,
      marginBottom: 28
    }
  }, STATS.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.label,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "var(--radius-lg)",
      background: s.color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 26,
      color: "var(--heading)",
      lineHeight: 1
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      marginTop: 3
    }
  }, s.label)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: 0,
      height: 40,
      display: "flex",
      alignItems: "center",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Buscar por nome ou gradua\xE7\xE3o...",
    value: query,
    onChange: e => setQuery(e.target.value),
    style: {
      paddingLeft: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, ["Todas", "Doutor", "Mestre", "Especialista"].map(t => /*#__PURE__*/React.createElement(Button, {
    key: t,
    variant: tit === t ? "default" : "outline",
    size: "sm",
    onClick: () => setTit(t)
  }, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, filtered.map((d, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement(Card, {
      key: i,
      style: {
        overflow: "hidden",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => setOpen(isOpen ? null : i),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: isOpen ? "chevron-down" : "chevron-right",
      size: 18,
      color: "var(--text-subtle)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "var(--radius-full)",
        background: "var(--faminas-light-050)",
        color: "var(--faminas-blue)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        flex: "none"
      }
    }, d.nome.split(" ").map(n => n[0]).slice(0, 2).join("")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 16,
        color: "var(--heading)"
      }
    }, d.nome), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-subtle)"
      }
    }, d.area)), /*#__PURE__*/React.createElement(Badge, {
      variant: TIT_VARIANT[d.tit]
    }, d.tit), /*#__PURE__*/React.createElement(Badge, {
      variant: "outline"
    }, d.regime)), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px 18px 74px",
        borderTop: "1px solid var(--gray-100)",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        paddingTop: 16
      }
    }, /*#__PURE__*/React.createElement(Metric, {
      label: "Publica\xE7\xF5es",
      value: d.pub
    }), /*#__PURE__*/React.createElement(Metric, {
      label: "Anos de experi\xEAncia",
      value: d.exp
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".06em",
        textTransform: "uppercase",
        color: "var(--text-subtle)",
        marginBottom: 6
      }
    }, "Curr\xEDculo Lattes"), d.lattes ? /*#__PURE__*/React.createElement(Button, {
      variant: "link",
      style: {
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-text",
      size: 14
    }), " Ver curr\xEDculo") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--text-subtle)"
      }
    }, "N\xE3o informado"))));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 48,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 32,
    color: "var(--gray-300)",
    style: {
      margin: "0 auto 12px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "var(--heading)",
      marginBottom: 4
    }
  }, "Nenhum docente encontrado"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-subtle)"
    }
  }, "Ajuste a busca ou os filtros de titula\xE7\xE3o.")))));
}
function Metric({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--text-subtle)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 22,
      color: "var(--faminas-blue)"
    }
  }, value));
}
window.DocentesDashboard = DocentesDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-docentes/DocentesDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal-docentes/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// Shared primitives for the FAMINAS / SIGA UI kits.
// Faithful, mainly-cosmetic recreations of the shadcn/ui components used in
// preceptor-point, profs-faminas and discentes_faminas.

// ---- Icon (Lucide, imperatively mounted so React never fights the SVG) ----
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color,
  className = "",
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (host && window.lucide) {
      host.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      host.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      ...style
    }
  });
}

// ---- Button ----
function Button({
  variant = "default",
  size = "default",
  children,
  className = "",
  style = {},
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    whiteSpace: "nowrap",
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: "pointer",
    transition: "all .15s ease",
    lineHeight: 1
  };
  const sizes = {
    sm: {
      height: 36,
      padding: "0 12px",
      fontSize: 13
    },
    default: {
      height: 40,
      padding: "0 16px",
      fontSize: 14
    },
    lg: {
      height: 46,
      padding: "0 28px",
      fontSize: 16
    },
    icon: {
      height: 40,
      width: 40,
      padding: 0
    }
  };
  const variants = {
    default: {
      background: "var(--primary)",
      color: "#fff",
      boxShadow: "var(--shadow-sm)"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "2px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)"
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff"
    },
    link: {
      background: "none",
      color: "var(--primary)",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      padding: 0,
      height: "auto",
      boxShadow: "none"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    default: {
      background: "var(--primary-hover)"
    },
    accent: {
      background: "var(--faminas-pink-700)"
    },
    outline: {
      borderColor: "var(--primary)",
      color: "var(--primary)"
    },
    ghost: {
      background: "var(--gray-100)"
    }
  }[variant] || {} : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle,
      ...style
    },
    className: className
  }, props), children);
}

// ---- Card ----
function Card({
  children,
  className = "",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, children);
}
function CardTitle({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--heading)",
      margin: 0,
      lineHeight: 1.2,
      ...style
    }
  }, children);
}
function CardDescription({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)",
      margin: 0,
      lineHeight: 1.45,
      ...style
    }
  }, children);
}
function CardContent({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      paddingTop: 0,
      ...style
    }
  }, children);
}

// ---- Badge ----
function Badge({
  variant = "default",
  children,
  style = {}
}) {
  const variants = {
    default: {
      background: "var(--faminas-blue)",
      color: "#fff"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    light: {
      background: "var(--faminas-light)",
      color: "#fff"
    },
    secondary: {
      background: "var(--gray-100)",
      color: "var(--gray-600)"
    },
    success: {
      background: "var(--success-bg)",
      color: "var(--success)"
    },
    warning: {
      background: "var(--warning-bg)",
      color: "var(--warning)"
    },
    destructive: {
      background: "var(--destructive-bg)",
      color: "var(--destructive)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      fontWeight: 600,
      padding: "3px 11px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1.4,
      ...variants[variant],
      ...style
    }
  }, children);
}

// ---- Input + Label ----
function Label({
  children,
  htmlFor,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--foreground)",
      marginBottom: 6,
      ...style
    }
  }, children);
}
function Input({
  style = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 40,
      width: "100%",
      border: "1px solid var(--border)",
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      padding: "0 12px",
      fontSize: 14,
      color: "var(--foreground)",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      outline: "none",
      ...(focus ? {
        borderColor: "var(--primary)",
        boxShadow: "0 0 0 3px rgba(30,64,175,.15)"
      } : {}),
      ...style
    }
  }, props));
}
Object.assign(window, {
  Icon,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Label,
  Input
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal-docentes/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/siga-preceptores/Auth.jsx
try { (() => {
/* global React, Icon, Button, Card, CardContent, Input, Label */
// Auth (login) — recreation of preceptor-point src/pages/Auth.tsx

function Auth({
  onLogin,
  onBack
}) {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const test = [{
    label: "Preceptor",
    email: "preceptor@siga.test"
  }, {
    label: "Estudante",
    email: "estudante@siga.test"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--gradient-faminas)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      width: "100%",
      maxWidth: 440,
      border: "none",
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: "36px 32px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      background: "var(--gradient-accent)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
      boxShadow: "var(--shadow-accent)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "stethoscope",
    size: 32,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 30,
      color: "var(--faminas-blue)",
      margin: "0 0 8px"
    }
  }, "SIGA"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: "var(--text-subtle)",
      margin: 0,
      lineHeight: 1.5
    }
  }, "Sistema de Gest\xE3o Acad\xEAmica", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--faminas-pink)",
      fontWeight: 500
    }
  }, "FAMINAS \xB7 BH"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "user"
  }, "Email, Usu\xE1rio ou Matr\xEDcula"), /*#__PURE__*/React.createElement(Input, {
    id: "user",
    placeholder: "email@hospital.com, usu\xE1rio ou matr\xEDcula",
    value: user,
    onChange: e => setUser(e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "pass"
  }, "Senha"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    id: "pass",
    type: show ? "text" : "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pass,
    onChange: e => setPass(e.target.value),
    style: {
      paddingRight: 44
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShow(!show),
    style: {
      position: "absolute",
      right: 4,
      top: 0,
      height: 40,
      width: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: show ? "eye-off" : "eye",
    size: 18
  })))), /*#__PURE__*/React.createElement(Button, {
    onClick: onLogin,
    style: {
      width: "100%",
      height: 48,
      fontSize: 15,
      marginTop: 4
    }
  }, "Entrar")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--border)",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: "var(--text-subtle)",
      margin: "0 0 10px"
    }
  }, "Contas de teste (senha: ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "123456"), ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, test.map(t => /*#__PURE__*/React.createElement(Button, {
    key: t.email,
    variant: "outline",
    size: "sm",
    onClick: onLogin
  }, t.label)))), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "block",
      margin: "18px auto 0",
      background: "none",
      border: "none",
      color: "var(--text-subtle)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, "\u2190 Voltar \xE0 p\xE1gina inicial"))));
}
window.Auth = Auth;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/siga-preceptores/Auth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/siga-preceptores/Dashboard.jsx
try { (() => {
/* global React, Icon, Button, Card, CardContent, CardTitle, Badge */
// Preceptor Dashboard — recreation of preceptor-point Dashboard.tsx + ChamadaSystem.tsx
// Mobile-first: status, escala, and interactive chamada (attendance).

const ALUNOS = [{
  id: 1,
  nome: "Ana Carolina Lima",
  matricula: "2022.1.0481"
}, {
  id: 2,
  nome: "Bruno Henrique Alves",
  matricula: "2022.1.0492"
}, {
  id: 3,
  nome: "Camila Ferreira Souza",
  matricula: "2022.1.0503"
}, {
  id: 4,
  nome: "Diego Martins Rocha",
  matricula: "2022.1.0514"
}, {
  id: 5,
  nome: "Eduarda Nunes Pires",
  matricula: "2022.1.0525"
}, {
  id: 6,
  nome: "Felipe Andrade Gomes",
  matricula: "2022.1.0536"
}];
const DIAS = [{
  d: "Seg",
  on: true,
  h: "07:00 - 11:00",
  amb: "UBS Centro-Sul",
  turma: "8M-A"
}, {
  d: "Ter",
  on: false
}, {
  d: "Qua",
  on: true,
  h: "13:00 - 17:00",
  amb: "Hosp. das Clínicas",
  turma: "8M-B"
}, {
  d: "Qui",
  on: false
}, {
  d: "Sex",
  on: true,
  h: "07:00 - 11:00",
  amb: "UBS Centro-Sul",
  turma: "8M-A"
}];
function Dashboard({
  onLogout
}) {
  const [presenca, setPresenca] = React.useState({
    1: true,
    2: true,
    3: false,
    4: true,
    5: true,
    6: false
  });
  const presentes = Object.values(presenca).filter(Boolean).length;
  const now = new Date();
  const hora = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const data = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  const toggle = id => setPresenca(p => ({
    ...p,
    [id]: !p[id]
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--gray-50)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--card)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      background: "var(--gradient-faminas)",
      borderRadius: "var(--radius-md)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "stethoscope",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--faminas-blue)"
    }
  }, "SIGA Preceptores"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, "Dr(a). Helena Vasconcelos"))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon",
    onClick: onLogout,
    style: {
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 18
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      maxWidth: 460,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "var(--shadow-sm)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)",
      marginBottom: 2
    }
  }, "Data:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--heading)",
      textTransform: "capitalize"
    }
  }, data)), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    style: {
      height: 34,
      width: 34,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 16
  })))), /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "var(--shadow-sm)",
      borderRadius: "var(--radius-lg)",
      borderLeft: "4px solid var(--primary)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 30,
      color: "var(--faminas-blue)",
      lineHeight: 1
    }
  }, hora), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)",
      marginTop: 4,
      textTransform: "capitalize"
    }
  }, data), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "success"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " Ativo no ambulat\xF3rio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      paddingTop: 14,
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Row, {
    icon: "map-pin",
    iconColor: "var(--faminas-light)",
    text: "UBS Centro-Sul",
    bold: true
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "clock",
    iconColor: "var(--primary)",
    text: "07:00 - 11:00"
  }), /*#__PURE__*/React.createElement(Row, {
    icon: "users",
    iconColor: "var(--faminas-pink)",
    text: "Turma 8M-A \xB7 8\xBA per\xEDodo"
  })))), /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "var(--shadow-sm)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clipboard-check",
    size: 18,
    color: "var(--faminas-blue)"
  }), /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      fontSize: 16
    }
  }, "Lista de Chamada")), /*#__PURE__*/React.createElement(Badge, {
    variant: presentes === ALUNOS.length ? "success" : "secondary"
  }, presentes, "/", ALUNOS.length, " presentes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, ALUNOS.map(a => {
    const on = presenca[a.id];
    return /*#__PURE__*/React.createElement("div", {
      key: a.id,
      onClick: () => toggle(a.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        background: on ? "var(--success-bg)" : "var(--white)",
        transition: "all .15s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: "var(--radius-full)",
        background: "var(--faminas-light-050)",
        color: "var(--faminas-blue)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 13,
        flex: "none"
      }
    }, a.nome.split(" ").map(n => n[0]).slice(0, 2).join("")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--heading)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, a.nome), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-subtle)",
        fontFamily: "var(--font-mono)"
      }
    }, a.matricula)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: "var(--radius-full)",
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: on ? "var(--success)" : "transparent",
        border: on ? "none" : "2px solid var(--gray-300)"
      }
    }, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "#fff",
      strokeWidth: 3
    })));
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    style: {
      width: "100%",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Confirmar chamada"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "var(--shadow-sm)",
      borderRadius: "var(--radius-lg)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      fontSize: 15,
      marginBottom: 12
    }
  }, "Escala da Semana"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, DIAS.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRadius: "var(--radius-md)",
      padding: 10,
      border: d.on && d.d === "Seg" ? "1px solid rgba(30,64,175,.3)" : "1px solid var(--border)",
      background: d.on && d.d === "Seg" ? "rgba(30,64,175,.05)" : "var(--gray-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: d.on && d.d === "Seg" ? "var(--primary)" : "var(--text-subtle)"
    }
  }, d.d), d.on ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--foreground)"
    }
  }, d.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-subtle)"
    }
  }, d.amb, " \xB7 ", d.turma)) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)"
    }
  }, "Sem escala")))))))));
}
function Row({
  icon,
  iconColor,
  text,
  bold
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: iconColor
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--foreground)",
      fontWeight: bold ? 600 : 400,
      whiteSpace: "nowrap"
    }
  }, text));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/siga-preceptores/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/siga-preceptores/Landing.jsx
try { (() => {
/* global React, Icon, Button, Card, CardContent, CardTitle, CardDescription */
// Landing page — recreation of preceptor-point src/pages/Index.tsx

function Landing({
  onEnter
}) {
  const features = [{
    icon: "clock",
    grad: true,
    title: "Check-in Digital",
    desc: "Registre sua presença de forma rápida e segura no ambulatório."
  }, {
    icon: "users",
    bg: "var(--faminas-light)",
    title: "Lista de Chamada",
    desc: "Controle a presença dos alunos com facilidade e praticidade."
  }, {
    icon: "file-text",
    bg: "var(--primary)",
    title: "Relatórios",
    desc: "Gere relatórios detalhados de presenças e atividades."
  }, {
    icon: "shield",
    bg: "var(--faminas-blue)",
    title: "Segurança",
    desc: "Dados protegidos com autenticação segura e criptografia."
  }];
  const steps = [{
    n: 1,
    grad: true,
    title: "Cadastre-se",
    desc: "Crie sua conta com o ID fornecido pela coordenação médica da FAMINAS."
  }, {
    n: 2,
    bg: "var(--faminas-light)",
    title: "Faça Check-in",
    desc: "Registre sua presença no ambulatório no início do plantão."
  }, {
    n: 3,
    bg: "var(--primary)",
    title: "Gerencie Alunos",
    desc: "Controle a presença dos alunos e gere relatórios automáticos."
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--gradient-subtle)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "rgba(255,255,255,.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "18px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      background: "var(--gradient-accent)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-accent)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "stethoscope",
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 20,
      color: "var(--faminas-blue)"
    }
  }, "SIGA Preceptores"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)",
      fontWeight: 500
    }
  }, "FAMINAS \xB7 Faculdade de Medicina"))), /*#__PURE__*/React.createElement(Button, {
    onClick: onEnter,
    style: {
      height: 44,
      padding: "0 28px"
    }
  }, "Entrar"))), /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "72px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 48,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      color: "var(--heading)",
      margin: "0 0 22px"
    }
  }, "Controle de Ponto e Chamada para", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--faminas-pink)"
    }
  }, "Preceptores FAMINAS")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      color: "var(--foreground)",
      maxWidth: 720,
      margin: "0 auto 36px",
      lineHeight: 1.6
    }
  }, "Plataforma moderna para gerenciamento de presen\xE7as, escalas e relat\xF3rios dos ambulat\xF3rios m\xE9dicos da FAMINAS-BH."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onEnter,
    style: {
      height: 56,
      padding: "0 40px",
      fontSize: 18,
      fontWeight: 600,
      boxShadow: "var(--shadow-faminas)"
    }
  }, "Come\xE7ar Agora")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 24,
      marginBottom: 80
    }
  }, features.map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.title,
    style: {
      textAlign: "center",
      border: "none",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: "var(--radius-lg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      background: f.grad ? "var(--gradient-accent)" : f.bg,
      boxShadow: f.grad ? "var(--shadow-accent)" : "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 26,
    color: "#fff"
  })), /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      color: "var(--faminas-blue)",
      marginBottom: 8
    }
  }, f.title), /*#__PURE__*/React.createElement(CardDescription, null, f.desc))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      maxWidth: 940,
      margin: "0 auto",
      border: "none",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      padding: "40px 48px 48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 30,
      color: "var(--faminas-blue)",
      margin: "0 0 10px"
    }
  }, "Como Funciona"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--text-subtle)",
      margin: 0
    }
  }, "Processo simples em 3 passos para come\xE7ar a usar o SIGA.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 40
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: "var(--radius-full)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      background: s.grad ? "var(--gradient-accent)" : s.bg,
      color: "#fff",
      fontWeight: 800,
      fontSize: 24,
      fontFamily: "var(--font-display)",
      boxShadow: s.grad ? "var(--shadow-accent)" : "var(--shadow-sm)"
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 19,
      color: "var(--faminas-blue)",
      margin: "0 0 8px"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-subtle)",
      fontSize: 14,
      lineHeight: 1.55,
      margin: 0
    }
  }, s.desc))))))), /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "rgba(255,255,255,.92)",
      borderTop: "1px solid var(--border)",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "32px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      background: "var(--gradient-accent)",
      borderRadius: "var(--radius-md)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "stethoscope",
    size: 16,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--faminas-blue)",
      fontFamily: "var(--font-display)"
    }
  }, "SIGA Preceptores")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-subtle)",
      fontSize: 13,
      margin: 0
    }
  }, "\xA9 2025 FAMINAS-BH \xB7 Sistema desenvolvido para o controle ambulatorial."))));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/siga-preceptores/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/siga-preceptores/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// Shared primitives for the FAMINAS / SIGA UI kits.
// Faithful, mainly-cosmetic recreations of the shadcn/ui components used in
// preceptor-point, profs-faminas and discentes_faminas.

// ---- Icon (Lucide, imperatively mounted so React never fights the SVG) ----
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color,
  className = "",
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (host && window.lucide) {
      host.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      host.appendChild(i);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": strokeWidth
        }
      });
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      ...style
    }
  });
}

// ---- Button ----
function Button({
  variant = "default",
  size = "default",
  children,
  className = "",
  style = {},
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    whiteSpace: "nowrap",
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: "pointer",
    transition: "all .15s ease",
    lineHeight: 1
  };
  const sizes = {
    sm: {
      height: 36,
      padding: "0 12px",
      fontSize: 13
    },
    default: {
      height: 40,
      padding: "0 16px",
      fontSize: 14
    },
    lg: {
      height: 46,
      padding: "0 28px",
      fontSize: 16
    },
    icon: {
      height: 40,
      width: 40,
      padding: 0
    }
  };
  const variants = {
    default: {
      background: "var(--primary)",
      color: "#fff",
      boxShadow: "var(--shadow-sm)"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "2px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)"
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff"
    },
    link: {
      background: "none",
      color: "var(--primary)",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      padding: 0,
      height: "auto",
      boxShadow: "none"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = hover ? {
    default: {
      background: "var(--primary-hover)"
    },
    accent: {
      background: "var(--faminas-pink-700)"
    },
    outline: {
      borderColor: "var(--primary)",
      color: "var(--primary)"
    },
    ghost: {
      background: "var(--gray-100)"
    }
  }[variant] || {} : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...hoverStyle,
      ...style
    },
    className: className
  }, props), children);
}

// ---- Card ----
function Card({
  children,
  className = "",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, children);
}
function CardTitle({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--heading)",
      margin: 0,
      lineHeight: 1.2,
      ...style
    }
  }, children);
}
function CardDescription({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)",
      margin: 0,
      lineHeight: 1.45,
      ...style
    }
  }, children);
}
function CardContent({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      paddingTop: 0,
      ...style
    }
  }, children);
}

// ---- Badge ----
function Badge({
  variant = "default",
  children,
  style = {}
}) {
  const variants = {
    default: {
      background: "var(--faminas-blue)",
      color: "#fff"
    },
    accent: {
      background: "var(--faminas-pink)",
      color: "#fff"
    },
    light: {
      background: "var(--faminas-light)",
      color: "#fff"
    },
    secondary: {
      background: "var(--gray-100)",
      color: "var(--gray-600)"
    },
    success: {
      background: "var(--success-bg)",
      color: "var(--success)"
    },
    warning: {
      background: "var(--warning-bg)",
      color: "var(--warning)"
    },
    destructive: {
      background: "var(--destructive-bg)",
      color: "var(--destructive)"
    },
    outline: {
      background: "#fff",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      fontWeight: 600,
      padding: "3px 11px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1.4,
      ...variants[variant],
      ...style
    }
  }, children);
}

// ---- Input + Label ----
function Label({
  children,
  htmlFor,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--foreground)",
      marginBottom: 6,
      ...style
    }
  }, children);
}
function Input({
  style = {},
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 40,
      width: "100%",
      border: "1px solid var(--border)",
      background: "var(--white)",
      borderRadius: "var(--radius-md)",
      padding: "0 12px",
      fontSize: 14,
      color: "var(--foreground)",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)",
      outline: "none",
      ...(focus ? {
        borderColor: "var(--primary)",
        boxShadow: "0 0 0 3px rgba(30,64,175,.15)"
      } : {}),
      ...style
    }
  }, props));
}
Object.assign(window, {
  Icon,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Label,
  Input
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/siga-preceptores/components.jsx", error: String((e && e.message) || e) }); }

})();
