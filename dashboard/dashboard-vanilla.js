// 🚀 Dashboard All In One Empire - JavaScript Vanilla Puro
// ======================================================

class DashboardApp {
    constructor() {
        this.currentUnit = 'overview';
        this.expandedSections = new Set();
        this.businessUnits = this.getBusinessUnitsData();
        this.tooltip = null;
        this.tooltipTimeout = null;

        this.init();
    }

    init() {
        this.createTooltip();
        this.renderUnits();
        this.bindEvents();
        this.animateOnLoad();
    }

    // Datos de las Unidades de Negocio
    getBusinessUnitsData() {
        return [
            {
                id: 'platform',
                name: 'allin1cabo.com',
                icon: '🌐',
                status: 'progress',
                revenue: 'Plataforma Central',
                growth: 'Integrador',
                locations: 'Cabo San Lucas, San José del Cabo',
                kpis: {
                    visitasMes: '45,000',
                    conversionReservas: '8.2%',
                    tiempoSitio: '4.5 min',
                    divisiones: '14',
                    nps: '72'
                },
                kpiDescriptions: {
                    visitasMes: 'Visitas mensuales al sitio web',
                    conversionReservas: 'Tasa de conversión de visitantes a reservas',
                    tiempoSitio: 'Tiempo promedio en el sitio (engagement)',
                    divisiones: 'Número de unidades de negocio integradas',
                    nps: 'Net Promoter Score (satisfacción del cliente, escala 0-100)'
                },
                justificacion: 'Hub central del ecosistema. Propuesta de valor unificada: todos los servicios en una plataforma. Escalabilidad exponencial al integrar múltiples fuentes de ingreso.',
                segmentoClientes: 'Todo el ecosistema: turistas, inversionistas, empresas',
                fuentesIngreso: 'Comisiones por reservas, publicidad premium, suscripciones',
                propuestaValor: 'Todo Los Cabos en un solo lugar: mar, tierra, aire'
            },
            {
                id: 'charters',
                name: 'Allin1 Cabo Charters',
                icon: '🚤',
                status: 'progress',
                revenue: '$2.4M',
                growth: '+36%',
                locations: 'Cabo San Lucas, La Paz, Mazatlán, Punta Mita, Riviera Maya',
                kpis: {
                    ocupacion: '82%',
                    pasajerosMes: '50,400',
                    margen: '45%',
                    cac: '$85',
                    clv: '$1,240'
                },
                kpiDescriptions: {
                    ocupacion: 'Porcentaje de capacidad utilizada de embarcaciones',
                    pasajerosMes: 'Total de pasajeros transportados por mes',
                    margen: 'Margen de contribución (ingresos - costos variables)',
                    cac: 'Customer Acquisition Cost: costo para adquirir un cliente',
                    clv: 'Customer Lifetime Value: valor de tiempo de vida del cliente'
                },
                justificacion: 'Mercado validado: 605K pasajeros cruceros. Propuesta 3x mejor: reservas digitales vs agencias tradicionales. Motor de reservas reduce CAC y aumenta margen.',
                segmentoClientes: 'Turistas internacionales luxury (85%), repetitivos (42%)',
                fuentesIngreso: 'Comisiones reserva (30%), tours premium, servicios adicionales',
                propuestaValor: 'Experiencia náutica premium 100% digital, reserva instantánea'
            },
            {
                id: 'naviera',
                name: 'Naviera Allin1',
                icon: '⚓',
                status: 'planned',
                revenue: '$1.8M',
                growth: 'Q2 2026',
                locations: 'Cabo San Lucas, La Paz, Mazatlán, Riviera Maya',
                kpis: {
                    flotaEmbarcaciones: '28',
                    capacidadPasajeros: '420',
                    certificaciones: '6',
                    seguros: '100%',
                    mantenimientoMes: '$42K'
                },
                kpiDescriptions: {
                    flotaEmbarcaciones: 'Total de embarcaciones en operación',
                    capacidadPasajeros: 'Capacidad total de pasajeros simultáneos',
                    certificaciones: 'Certificaciones náuticas y de seguridad vigentes',
                    seguros: 'Porcentaje de flota con cobertura completa',
                    mantenimientoMes: 'Costo mensual de mantenimiento preventivo/correctivo'
                },
                justificacion: 'Recurso clave: control de flota asegura calidad. Permisos SCT/ASIPONA son barreras de entrada. Logística optimizada reduce costos 30%.',
                segmentoClientes: 'Operadores turísticos, hoteles premium, cruceros',
                fuentesIngreso: 'Contratos operación flotilla, mantenimiento, logística',
                propuestaValor: 'Operación náutica certificada, segura, eficiente'
            },
            {
                id: 'workshop',
                name: 'Marine & Auto Workshop',
                icon: '🛠️',
                status: 'development',
                revenue: '$450K',
                growth: 'Nuevo',
                locations: 'Cabo San Lucas, La Paz, San José del Cabo',
                kpis: {
                    capacidadMensual: '120 servicios',
                    ticketPromedio: '$850',
                    margen: '62%',
                    alianzas: '8 marinas',
                    recurrencia: '38%'
                },
                kpiDescriptions: {
                    capacidadMensual: 'Número máximo de servicios que puede realizar por mes',
                    ticketPromedio: 'Valor promedio de cada servicio',
                    margen: 'Margen bruto (ingresos - costos directos)',
                    alianzas: 'Número de marinas y concesionarias con acuerdos',
                    recurrencia: 'Porcentaje de clientes que regresan'
                },
                justificacion: 'Oportunidad identificada: 40K+ embarcaciones sin servicio integrado náutico+auto. Diferenciación radical: único taller dual.',
                segmentoClientes: 'Propietarios embarcaciones premium, flotillas, autos luxury',
                fuentesIngreso: 'Servicios mantenimiento, detailing, diagnóstico, emergencias',
                propuestaValor: 'Único servicio integrado náutico+auto, atención móvil'
            },
            {
                id: 'constructions',
                name: 'Allin1 Constructions',
                icon: '🏗️',
                status: 'planned',
                revenue: '$3.5M',
                growth: 'Q3 2026',
                locations: 'Cabo San Lucas, San José del Cabo, Riviera Maya',
                kpis: {
                    proyectosActivos: '12',
                    m2Construccion: '8,400',
                    margenProyecto: '28%',
                    tiempoEntrega: '180 días',
                    clientesRepetitivos: '45%'
                },
                kpiDescriptions: {
                    proyectosActivos: 'Número de proyectos en construcción simultáneos',
                    m2Construccion: 'Metros cuadrados totales en desarrollo',
                    margenProyecto: 'Margen promedio por proyecto terminado',
                    tiempoEntrega: 'Tiempo promedio de entrega de proyectos',
                    clientesRepetitivos: 'Clientes que contratan más de un proyecto'
                },
                justificacion: 'Mercado en expansión: +85 grupos hoteleros. Problema real: falta de constructoras especializadas en luxury. Márgenes altos justifican inversión.',
                segmentoClientes: 'Inversionistas inmobiliarios, desarrolladores, hoteles',
                fuentesIngreso: 'Contratos construcción, remodelación, diseño',
                propuestaValor: 'Construcción luxury turnkey, experiencia premium'
            },
            {
                id: 'properties',
                name: 'Allin1 Properties',
                icon: '🏠',
                status: 'planned',
                revenue: '$8.5M',
                growth: '+24%',
                locations: 'San José, Cabo, Riviera Maya',
                kpis: {
                    propiedades: '47',
                    valorPromedio: '$1.2M',
                    comision: '6%',
                    diasVenta: '45',
                    repeticion: '31%'
                },
                kpiDescriptions: {
                    propiedades: 'Número de propiedades en cartera activa',
                    valorPromedio: 'Valor promedio de las propiedades',
                    comision: 'Comisión promedio por transacción',
                    diasVenta: 'Tiempo promedio desde listado hasta cierre',
                    repeticion: 'Clientes que regresan para otra transacción'
                },
                justificacion: 'Segmentación clara: inversionistas USA (80% mercado). Valor promedio luxury validado: $2,489 USD/noche. Modelo de comisiones permite escalabilidad.',
                segmentoClientes: 'Inversionistas USA high-value, compradores luxury',
                fuentesIngreso: 'Comisiones venta (6%), renta temporal, asesoría inversión',
                propuestaValor: 'Cartera exclusiva luxury, asesoría personalizada, ROI alto'
            },
            {
                id: 'bikes',
                name: 'Allin1 Bikes',
                icon: '🚲',
                status: 'development',
                revenue: '$180K',
                growth: 'MVP',
                locations: 'Cabo San Lucas',
                kpis: {
                    bicicletas: '150',
                    viajesDia: '420',
                    tarifaHora: '$8',
                    zonas: '12',
                    appDownloads: '3,200'
                },
                kpiDescriptions: {
                    bicicletas: 'Total de bicicletas eléctricas en flota',
                    viajesDia: 'Número promedio de viajes diarios',
                    tarifaHora: 'Tarifa por hora de renta',
                    zonas: 'Estaciones/zonas de disponibilidad',
                    appDownloads: 'Descargas totales de la app'
                },
                justificacion: 'Modelo startup escalable: inversión inicial se distribuye entre usuarios crecientes. CAC $12 vs CLV $96. MVP permite iteración rápida.',
                segmentoClientes: 'Turistas eco-conscientes, millennials, viajeros urbanos',
                fuentesIngreso: 'Renta por hora/día, suscripciones mensuales, publicidad',
                propuestaValor: 'Movilidad eco-friendly instantánea vía app'
            },
            {
                id: 'app',
                name: 'Allin1 App Central',
                icon: '📱',
                status: 'design',
                revenue: 'Integrador',
                growth: 'Q4 2025',
                locations: 'Cobertura nacional',
                kpis: {
                    usuarios: '8,500',
                    reservasMes: '1,240',
                    nps: '67',
                    integraciones: '14',
                    retencion: '54%'
                },
                kpiDescriptions: {
                    usuarios: 'Usuarios activos registrados en la app',
                    reservasMes: 'Total de reservas mensuales en todas las divisiones',
                    nps: 'Net Promoter Score (satisfacción, escala 0-100)',
                    integraciones: 'Servicios integrados en la app',
                    retencion: 'Usuarios que usan la app mes tras mes'
                },
                justificacion: 'Tecnología clave: centraliza todas las unidades de negocio. Creador de alegrías: experiencia unificada sin fricción. Retención 54% aumenta CLV.',
                segmentoClientes: 'Todo el ecosistema All In One Empire conectado',
                fuentesIngreso: 'Comisiones por reserva, suscripciones premium, publicidad',
                propuestaValor: 'Todo el ecosistema conectado: una app, infinitas experiencias'
            },
            {
                id: 'cars',
                name: 'Allin1 Cars',
                icon: '🚗',
                status: 'planned',
                revenue: '$2.1M',
                growth: 'Q3 2025',
                locations: 'Cabo San Lucas, San José',
                kpis: {
                    flota: '85',
                    rentaDia: '$95',
                    ocupacion: '68%',
                    electricos: '15%',
                    alianzas: '6 seguros'
                },
                kpiDescriptions: {
                    flota: 'Total de vehículos disponibles para renta',
                    rentaDia: 'Tarifa promedio de renta diaria',
                    ocupacion: 'Porcentaje de días que los autos están rentados',
                    electricos: 'Porcentaje de flota con vehículos eléctricos',
                    alianzas: 'Compañías de seguros asociadas'
                },
                justificacion: 'Mercado existente con diferenciación: flota eléctrica premium (15%). 4.5M pasajeros/año necesitan transporte. Precio del cambio bajo.',
                segmentoClientes: 'Turistas internacionales, ejecutivos, familias premium',
                fuentesIngreso: 'Renta diaria/semanal, seguros premium, servicios adicionales',
                propuestaValor: 'Flota premium con vehículos eléctricos, servicio express'
            },
            {
                id: 'boats',
                name: 'Allin1 Boats (Buy & Sell)',
                icon: '🚤',
                status: 'progress',
                revenue: '$1.2M',
                growth: '+18%',
                locations: 'Cabo San Lucas, La Paz, Mazatlán, Punta Mita',
                kpis: {
                    inventario: '34 embarcaciones',
                    valorPromedio: '$180K',
                    comision: '8%',
                    tiempoVenta: '60 días',
                    alianzasBrokers: '12'
                },
                kpiDescriptions: {
                    inventario: 'Embarcaciones en consignación/venta',
                    valorPromedio: 'Valor promedio de embarcaciones',
                    comision: 'Comisión promedio por venta',
                    tiempoVenta: 'Tiempo promedio desde listado hasta venta',
                    alianzasBrokers: 'Brokers y astilleros asociados'
                },
                justificacion: 'Oportunidad en mercado establecido: 40K+ embarcaciones registradas. Alianzas con brokers reducen costo de inventario.',
                segmentoClientes: 'Compradores náuticos USA/CA, inversionistas marinos',
                fuentesIngreso: 'Comisiones venta (8%), consignación, brokerage, asesoría',
                propuestaValor: 'Acceso a inventario exclusivo, proceso transparente'
            },
            {
                id: 'villas',
                name: 'Airbnb & Villas',
                icon: '🏡',
                status: 'active',
                revenue: '$1.8M',
                growth: '+18%',
                locations: 'Cabo, San José, Riviera Maya',
                kpis: {
                    ocupacion: '73%',
                    tarifaNoche: '$385',
                    villas: '24',
                    satisfaccion: '4.8/5',
                    repetitivos: '42%'
                },
                kpiDescriptions: {
                    ocupacion: 'Porcentaje de noches ocupadas vs disponibles',
                    tarifaNoche: 'Tarifa promedio por noche',
                    villas: 'Total de propiedades en administración',
                    satisfaccion: 'Calificación promedio de huéspedes',
                    repetitivos: 'Huéspedes que regresan'
                },
                justificacion: 'CLV optimizado: 42% turistas repetitivos. Alleviador de frustraciones: concierge 24/7 digital. Flujo de caja positivo por pagos anticipados.',
                segmentoClientes: 'Viajeros premium, familias, grupos corporativos',
                fuentesIngreso: 'Renta por noche, servicios concierge, experiencias',
                propuestaValor: 'Villas premium + concierge 24/7, experiencias memorables'
            },
            {
                id: 'ice',
                name: 'Allin1 Ice Distribution',
                icon: '🧊',
                status: 'planned',
                revenue: '$320K',
                growth: 'Q1 2026',
                locations: 'Cabo San Lucas, La Paz',
                kpis: {
                    clientesActivos: '78',
                    toneladasMes: '240',
                    rutasDistribucion: '8',
                    margen: '42%',
                    contratos: '52 anuales'
                },
                kpiDescriptions: {
                    clientesActivos: 'Clientes B2B con pedidos regulares',
                    toneladasMes: 'Toneladas de hielo distribuidas mensualmente',
                    rutasDistribucion: 'Rutas de entrega establecidas',
                    margen: 'Margen bruto (precio venta - costo producción)',
                    contratos: 'Contratos anuales activos (recurrencia)'
                },
                justificacion: 'Mercado B2B estable: hoteles a 79% ocupación + 605K cruceros requieren suministro constante. Modelo de contratos anuales asegura recurrencia.',
                segmentoClientes: 'Hoteles, restaurantes, marinas, cruceros, eventos',
                fuentesIngreso: 'Venta hielo, contratos anuales, distribución eventos',
                propuestaValor: 'Distribución confiable 24/7, calidad certificada'
            },
            {
                id: 'import',
                name: 'Allin1 Import & Distribution',
                icon: '📦',
                status: 'planned',
                revenue: '$2.8M',
                growth: 'Q2 2026',
                locations: 'Los Cabos, Mazatlán',
                kpis: {
                    productosSKU: '340',
                    clientesB2B: '124',
                    margenPromedio: '35%',
                    volumenMensual: '$180K',
                    alianzasUSA: '8'
                },
                kpiDescriptions: {
                    productosSKU: 'Stock Keeping Units: productos únicos en catálogo',
                    clientesB2B: 'Clientes Business-to-Business activos',
                    margenPromedio: 'Margen promedio en productos importados',
                    volumenMensual: 'Volumen de ventas mensual en USD',
                    alianzasUSA: 'Proveedores/distribuidores en EUA'
                },
                justificacion: 'Problema identificado: demanda insatisfecha de productos USA en sector turístico. Márgenes altos en productos especializados luxury.',
                segmentoClientes: 'Hoteles luxury, restaurantes premium, marinas',
                fuentesIngreso: 'Venta productos importados, distribución B2B, logística',
                propuestaValor: 'Productos USA premium, proceso aduanal simplificado'
            },
            {
                id: 'travel',
                name: 'Allin1 Travel Agency',
                icon: '✈️',
                status: 'planned',
                revenue: '$3.2M',
                growth: 'Q1 2026',
                locations: 'Cobertura nacional',
                kpis: {
                    paquetes: '340/año',
                    ticketPromedio: '$4,500',
                    margen: '22%',
                    corporativos: '28%',
                    satisfaccion: '4.7/5'
                },
                kpiDescriptions: {
                    paquetes: 'Paquetes turísticos vendidos anualmente',
                    ticketPromedio: 'Valor promedio por paquete',
                    margen: 'Margen después de comisiones a proveedores',
                    corporativos: 'Porcentaje de ventas a segmento corporativo/MICE',
                    satisfaccion: 'Calificación promedio de clientes'
                },
                justificacion: 'Segmentación nicho: MICE y luxury. Complementos generan más lucro que servicio base. Canales: alianzas con hoteles top reducen CAC.',
                segmentoClientes: 'Segmento MICE, luxury travelers, grupos corporativos',
                fuentesIngreso: 'Paquetes turísticos, comisiones hoteles/tours, servicios VIP',
                propuestaValor: 'Paquetes luxury a medida, acceso VIP, sin intermediarios'
            },
            {
                id: 'marineworkshop',
                name: '🛠️ Allin1 Marine & Auto Workshop',
                icon: '🛠️',
                status: 'development',
                revenue: '$650K',
                growth: '⭐ NUEVO DESTACADO',
                locations: 'Cabo San Lucas, La Paz, San José del Cabo',
                kpis: {
                    serviciosMes: '180',
                    ticketPromedio: '$920',
                    margen: '65%',
                    clientesRecurrentes: '42%',
                    calificacion: '4.9/5'
                },
                kpiDescriptions: {
                    serviciosMes: 'Servicios totales realizados mensualmente',
                    ticketPromedio: 'Valor promedio por servicio (náutico+auto)',
                    margen: 'Margen bruto (servicios especializados alta rentabilidad)',
                    clientesRecurrentes: 'Clientes que regresan para mantenimiento',
                    calificacion: 'Calificación promedio de satisfacción'
                },
                justificacion: '💡 PROYECTO DESTACADO: Fusión disruptiva náutico+automotriz. Oportunidad única: 40K+ embarcaciones + mercado autos luxury/eléctricos sin servicio especializado integrado. Diagnóstico electrónico avanzado + servicio móvil = diferenciación radical 3x mejor que talleres tradicionales. Barreras de entrada: certificaciones técnicas y alianzas con marinas.',
                segmentoClientes: '⭐ Propietarios yates/embarcaciones premium, flotillas charters, dueños autos luxury/eléctricos, marinas, concesionarias premium',
                fuentesIngreso: '⭐ Mantenimiento preventivo/correctivo náutico+auto, diagnóstico electrónico avanzado, detailing premium, servicio móvil 24/7, certificaciones técnicas, paquetes anuales',
                propuestaValor: '⭐ ÚNICO TALLER DUAL: Fusión revolucionaria náutico+automotriz. Diagnóstico digital avanzado, servicio móvil a domicilio/marina, certificaciones premium. "Donde el mar y la tierra se encuentran en movimiento"'
            }
        ];
    }

    // Crear Tooltip
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.tooltip.id = 'tooltip';
        document.body.appendChild(this.tooltip);
    }

    // Renderizar Unidades de Negocio
    renderUnits() {
        const unitsGrid = document.getElementById('units-grid');
        if (!unitsGrid) return;

        unitsGrid.innerHTML = '';

        this.businessUnits.forEach(unit => {
            const unitCard = this.createUnitCard(unit);
            unitsGrid.appendChild(unitCard);
        });
    }

    createUnitCard(unit) {
        const card = document.createElement('div');
        card.className = `unit-card ${unit.id === this.currentUnit ? 'selected' : ''}`;
        card.onclick = () => this.selectUnit(unit.id);

        const statusLabels = {
            active: '🟢 Activo',
            progress: '🟡 En progreso',
            development: '🟢 En desarrollo',
            design: '🟡 En diseño',
            planned: '🔵 Planeado'
        };

        card.innerHTML = `
            <div class="unit-icon">${unit.icon}</div>
            <div class="unit-name">${unit.name.replace('Allin1 ', '').replace('allin1cabo.com', 'Plataforma')}</div>
            <div class="unit-status">${statusLabels[unit.status] || '🔵 Planeado'}</div>
        `;

        return card;
    }

    // Seleccionar Unidad
    selectUnit(unitId) {
        this.currentUnit = unitId;

        // Actualizar visualización de tarjetas
        document.querySelectorAll('.unit-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[onclick="app.selectUnit('${unitId}')"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Mostrar detalles si no es overview
        if (unitId === 'overview') {
            this.showAllUnits();
        } else {
            this.showUnitDetail(unitId);
        }
    }

    // Mostrar Vista General
    showAllUnits() {
        const unitDetail = document.getElementById('unit-detail');
        if (unitDetail) {
            unitDetail.style.display = 'none';
        }
    }

    // Mostrar Detalles de Unidad
    showUnitDetail(unitId) {
        const unit = this.businessUnits.find(u => u.id === unitId);
        if (!unit) return;

        // Actualizar header
        document.getElementById('detail-icon').textContent = unit.icon;
        document.getElementById('detail-title-text').textContent = unit.name;
        document.getElementById('detail-status').textContent = this.getStatusLabel(unit.status);
        document.getElementById('detail-revenue').textContent = unit.revenue;
        document.getElementById('detail-growth').textContent = unit.growth;
        document.getElementById('detail-location').textContent = `📍 ${unit.locations}`;

        // Aplicar colores según estado
        this.applyStatusColors(unit.status);

        // Renderizar KPIs
        this.renderUnitKPIs(unit);

        // Actualizar textos del accordion
        document.getElementById('justificacion-text').textContent = unit.justificacion;
        document.getElementById('segmento-text').textContent = unit.segmentoClientes;
        document.getElementById('fuentes-text').textContent = unit.fuentesIngreso;
        document.getElementById('propuesta-text').textContent = unit.propuestaValor;

        // Mostrar sección
        const unitDetail = document.getElementById('unit-detail');
        if (unitDetail) {
            unitDetail.style.display = 'block';
            unitDetail.classList.add('animate-fade-in');
        }
    }

    // Renderizar KPIs de Unidad
    renderUnitKPIs(unit) {
        const kpiGrid = document.getElementById('kpi-detail-grid');
        if (!kpiGrid) return;

        kpiGrid.innerHTML = '';

        Object.entries(unit.kpis).forEach(([key, value]) => {
            const kpiCard = document.createElement('div');
            kpiCard.className = 'kpi-detail-card';
            kpiCard.setAttribute('data-tooltip', unit.kpiDescriptions[key]);

            const label = key.replace(/([A-Z])/g, ' $1').trim();

            kpiCard.innerHTML = `
                <div class="kpi-detail-label">${label}</div>
                <div class="kpi-detail-value">${value}</div>
            `;

            kpiGrid.appendChild(kpiCard);
        });
    }

    // Aplicar colores según estado
    applyStatusColors(status) {
        const statusColors = {
            active: { bg: '#10b981', text: 'white' },
            progress: { bg: '#f59e0b', text: 'white' },
            development: { bg: '#3b82f6', text: 'white' },
            design: { bg: '#8b5cf6', text: 'white' },
            planned: { bg: '#6b7280', text: 'white' }
        };

        const colors = statusColors[status] || statusColors.planned;

        const badges = ['detail-status', 'detail-revenue', 'detail-growth'];
        badges.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.backgroundColor = colors.bg;
                element.style.color = colors.text;
            }
        });
    }

    // Obtener etiqueta de estado
    getStatusLabel(status) {
        const labels = {
            active: '🟢 Activo',
            progress: '🟡 En progreso',
            development: '🟢 En desarrollo',
            design: '🟡 En diseño',
            planned: '🔵 Planeado'
        };
        return labels[status] || '🔵 Planeado';
    }

    // Sistema de Accordion
    toggleAccordion(section) {
        const content = document.getElementById(`${section}-content`);
        const arrow = document.getElementById(`${section}-arrow`);
        const item = content.closest('.accordion-item');

        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            // Cerrar
            content.style.maxHeight = '0px';
            content.style.padding = '0';
            item.classList.remove('active');
            arrow.textContent = '▶';
        } else {
            // Abrir
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.padding = '16px';
            item.classList.add('active');
            arrow.textContent = '▼';
        }
    }

    // Toggle de secciones
    toggleSection(sectionId) {
        const section = document.getElementById(`${sectionId}-details`);
        if (section) {
            section.style.display = section.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Sistema de Tooltips
    showTooltip(text, event) {
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
        }

        this.tooltip.textContent = text;
        this.tooltip.style.display = 'block';
        this.tooltip.classList.add('show');

        const rect = event.target.getBoundingClientRect();
        this.tooltip.style.left = (rect.left + rect.width / 2 - this.tooltip.offsetWidth / 2) + 'px';
        this.tooltip.style.top = (rect.top - this.tooltip.offsetHeight - 8) + 'px';
    }

    hideTooltip() {
        this.tooltipTimeout = setTimeout(() => {
            this.tooltip.classList.remove('show');
            this.tooltip.style.display = 'none';
        }, 100);
    }

    // Eventos
    bindEvents() {
        // Tooltips para KPIs
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.kpi-card') || e.target.closest('.kpi-detail-card')) {
                const tooltipText = e.target.closest('[data-tooltip]')?.getAttribute('data-tooltip');
                if (tooltipText) {
                    this.showTooltip(tooltipText, e);
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.kpi-card') || e.target.closest('.kpi-detail-card')) {
                this.hideTooltip();
            }
        });

        // Tooltips para elementos con data-tooltip
        document.addEventListener('mousemove', (e) => {
            if (e.target.hasAttribute('data-tooltip')) {
                this.showTooltip(e.target.getAttribute('data-tooltip'), e);
            }
        });

        document.addEventListener('mouseleave', (e) => {
            if (e.target.hasAttribute('data-tooltip')) {
                this.hideTooltip();
            }
        });

        // Mover tooltip con el mouse
        document.addEventListener('mousemove', (e) => {
            if (this.tooltip.classList.contains('show')) {
                const rect = e.target.getBoundingClientRect();
                this.tooltip.style.left = (rect.left + rect.width / 2 - this.tooltip.offsetWidth / 2) + 'px';
                this.tooltip.style.top = (rect.top - this.tooltip.offsetHeight - 8) + 'px';
            }
        });
    }

    // Animaciones al cargar
    animateOnLoad() {
        setTimeout(() => {
            document.querySelectorAll('.unit-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-fade-in');
                }, index * 50);
            });
        }, 100);
    }
}

// Inicializar aplicación cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DashboardApp();
});

// Función global para mostrar todas las unidades
function showAllUnits() {
    window.app.showAllUnits();
}

// Función global para toggle de secciones
function toggleSection(sectionId) {
    window.app.toggleSection(sectionId);
}

// Función global para toggle de accordion
function toggleAccordion(section) {
    window.app.toggleAccordion(section);
}