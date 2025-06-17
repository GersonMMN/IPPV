document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader')?.classList.add('hide');
    }, 2000);

    // Seções animadas
    const animateSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
                section.classList.add('section-visible');
            }
        });
    };
    animateSections();
    window.addEventListener('scroll', animateSections);

    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Smooth scroll para links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            navMenu?.classList.remove('open');
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão de voltar ao topo
    const createBackToTopButton = () => {
        const backToTopButton = document.createElement('div');
        backToTopButton.classList.add('back-to-top');
        backToTopButton.innerHTML = '<span>↑</span>';
        document.body.appendChild(backToTopButton);
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.pageYOffset > 750);
        });
    };
    createBackToTopButton();

    // Animação fade-up
    const animateFadeElements = () => {
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
                element.classList.add('active');
            }
        });
    };
    animateFadeElements();
    window.addEventListener('scroll', animateFadeElements);

    // Carrossel de testemunhos
    const initTestimonialsCarousel = () => {
        const testemunhos = document.querySelectorAll('.testemunho');
        if (testemunhos.length === 0) return;

        let currentTestemunho = 0;
        const showTestemunho = (index) => {
            testemunhos.forEach((testemunho, i) => {
                testemunho.style.display = i === index ? 'block' : 'none';
                testemunho.style.opacity = i === index ? '1' : '0';
            });
        };

        showTestemunho(currentTestemunho);
        setInterval(() => {
            currentTestemunho = (currentTestemunho + 1) % testemunhos.length;
            showTestemunho(currentTestemunho);
        }, 5000);
    };
    initTestimonialsCarousel();

    // Efeito ripple em botões
    const addRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${e.clientX - rect.left}px`;
                ripple.style.top = `${e.clientY - rect.top}px`;
                
                button.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };
    addRippleEffect();

    // Destacar seção atual no menu
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    };
    window.addEventListener('scroll', highlightCurrentSection);

    // Animação do header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-scrolled', window.scrollY > 100);
    });

    // Animações adicionais
    document.querySelectorAll('.ministerio-card, .evento-card').forEach((card, index) => {
        card.classList.add('fade-up');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Efeito hover na galeria
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            galleryImages.forEach(img => {
                if (img !== image) {
                    img.style.opacity = '0.7';
                    img.style.transform = 'scale(0.95)';
                }
            });
        });
        
        image.addEventListener('mouseleave', () => {
            galleryImages.forEach(img => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        });
    });

    // Efeito parallax para heróis
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${-(window.pageYOffset * 0.5)}px`;
        }
    });

    // Animação do logo
    const logoElement = document.querySelector('.logo');
    logoElement?.classList.add('animated');

    // Módulo de contagem regressiva de eventos
    const initEventCountdowns = () => {
        // As funções auxiliares e a lógica principal de contagem regressiva 
        // (extrairData, converterParaDate, criarContador, etc.) seriam mantidas aqui
        // Exemplo simplificado seria adicionar as funções necessárias
    };
    initEventCountdowns();
});

// Função para normalizar texto (remover acentos e converter para minúsculas)
function normalize(texto) {
    return texto.normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '')
               .toLowerCase()
               .trim();
}

// Sistema de Contadores de Eventos - Versão Otimizada

class EventoContador {
    constructor() {
        this.meses = this.criarMapaMeses();
        this.intervalosPadrao = {
            horario: "19:00",
            duracao: "01:00"
        };
    }

    // Mapa de meses consolidado
    criarMapaMeses() {
        return new Map([
            ['janeiro', 0], ['jan', 0],
            ['fevereiro', 1], ['fev', 1],
            ['marco', 2], ['março', 2], ['mar', 2],
            ['abril', 3], ['abr', 3],
            ['maio', 4],
            ['junho', 5], ['jun', 5],
            ['julho', 6], ['jul', 6],
            ['agosto', 7], ['ago', 7],
            ['setembro', 8], ['set', 8],
            ['outubro', 9], ['out', 9],
            ['novembro', 10], ['nov', 10],
            ['dezembro', 11], ['dez', 11]
        ]);
    }

    // Normalização de texto otimizada
    normalize(texto) {
        return texto?.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim() || '';
    }

    // Obter nome do mês pelo número
    obterNomeMes(mesNumero) {
        return [...this.meses.entries()]
            .find(([_, num]) => num === mesNumero)?.[0] || '';
    }

    // Parser de data unificado e otimizado
    extrairData(texto) {
        if (!texto) return null;

        const textoNorm = this.normalize(texto);
        
        // Padrões de data consolidados
        const padroes = [
            // DD/MM/AAAA
            {
                regex: /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
                parser: ([, dia, mes, ano]) => 
                    `${dia.padStart(2, '0')} de ${this.obterNomeMes(parseInt(mes) - 1)} de ${ano}`
            },
            // DD de MMMM de AAAA
            {
                regex: /(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i,
                parser: ([, dia, mes, ano]) => `${dia} de ${mes} de ${ano}`
            },
            // DD a DD de MMMM (ano atual)
            {
                regex: /(\d{1,2})\s+a\s+\d{1,2}\s+de\s+(\w+)/i,
                parser: ([, dia, mes]) => `${dia} de ${mes} de ${new Date().getFullYear()}`
            },
            // DD de MMMM (ano atual)
            {
                regex: /(\d{1,2})\s+de\s+(\w+)/i,
                parser: ([, dia, mes]) => `${dia} de ${mes} de ${new Date().getFullYear()}`
            },
            // Último dia da semana do mês
            {
                regex: /(último|última|ultimo|ultima)\s+(segunda|terca|quarta|quinta|sexta|sabado|domingo)(-feira)?\s+do\s+m[eé]s/i,
                parser: ([, , diaSemana]) => {
                    const ultimoDia = this.calcularUltimoDiaDoMes(diaSemana);
                    return ultimoDia ? 
                        `${ultimoDia.getDate()} de ${this.obterNomeMes(ultimoDia.getMonth())} de ${ultimoDia.getFullYear()}` : 
                        null;
                }
            }
        ];

        for (const { regex, parser } of padroes) {
            const match = textoNorm.match(regex);
            if (match) {
                return parser(match);
            }
        }

        return null;
    }

    // Parser de horário otimizado
    extrairHorario(texto) {
        if (!texto) return this.intervalosPadrao.horario;

        const padroes = [
            /(\d{1,2}):(\d{2})\s*(?:às|as)\s*(\d{1,2}):(\d{2})/i,
            /(\d{1,2})h\s*(?:às|as)\s*(\d{1,2})h/i,
            /(\d{1,2}):(\d{2})h/i,
            /(\d{1,2})h/i,
            /(\d{1,2}):(\d{2})/
        ];

        for (const padrao of padroes) {
            const match = texto.match(padrao);
            if (match) {
                const hora = match[1].padStart(2, '0');
                const minuto = match[2] || '00';
                return `${hora}:${minuto}`;
            }
        }

        return this.intervalosPadrao.horario;
    }

    // Cálculo de duração otimizado
    extrairDuracao(texto) {
        if (!texto) return this.intervalosPadrao.duracao;

        const padroes = [
            {
                regex: /(\d{1,2}):(\d{2})\s*(?:às|as)\s*(\d{1,2}):(\d{2})/i,
                calcular: ([, h1, m1, h2, m2]) => this.calcularDiferenca(+h1, +m1, +h2, +m2)
            },
            {
                regex: /(\d{1,2}):(\d{2})\s*(?:às|as)\s*(\d{1,2})h/i,
                calcular: ([, h1, m1, h2]) => this.calcularDiferenca(+h1, +m1, +h2, 0)
            },
            {
                regex: /(\d{1,2})h\s*(?:às|as)\s*(\d{1,2})h/i,
                calcular: ([, h1, h2]) => this.calcularDiferenca(+h1, 0, +h2, 0)
            }
        ];

        for (const { regex, calcular } of padroes) {
            const match = texto.match(regex);
            if (match) {
                return calcular(match);
            }
        }

        return this.intervalosPadrao.duracao;
    }

    // Cálculo de diferença de tempo consolidado
    calcularDiferenca(h1, m1, h2, m2) {
        let inicio = h1 * 60 + m1;
        let fim = h2 * 60 + m2;
        
        if (fim < inicio) fim += 24 * 60;
        
        const diferenca = fim - inicio;
        const horas = Math.floor(diferenca / 60);
        const minutos = diferenca % 60;
        
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    }

    // Conversão para Date otimizada
    converterParaDate(textoData, horario = this.intervalosPadrao.horario, duracao = this.intervalosPadrao.duracao) {
        if (!textoData || textoData instanceof Date) return null;

        // Parser para formato DD/MM/AAAA
        const matchBarras = textoData.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (matchBarras) {
            const [, dia, mes, ano] = matchBarras;
            const data = new Date(+ano, +mes - 1, +dia);
            return this.criarObjetoEvento(data, horario, duracao);
        }

        // Parser para formato brasileiro "DD de MMMM de AAAA"
        const matchBrasileiro = textoData.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/i);
        if (matchBrasileiro) {
            const [, dia, mesTexto, ano] = matchBrasileiro;
            const mesNumero = this.meses.get(this.normalize(mesTexto));
            
            if (mesNumero !== undefined) {
                const data = new Date(+ano, mesNumero, +dia);
                return this.criarObjetoEvento(data, horario, duracao);
            }
        }

        // Parser para "DD de MMMM" (ano atual)
        const matchSimples = textoData.match(/(\d{1,2})\s+de\s+(\w+)/i);
        if (matchSimples) {
            const [, dia, mesTexto] = matchSimples;
            const mesNumero = this.meses.get(this.normalize(mesTexto));
            
            if (mesNumero !== undefined) {
                const hoje = new Date();
                const data = new Date(hoje.getFullYear(), mesNumero, +dia);
                
                // Ajustar para próximo ano se necessário
                if (data < hoje) {
                    data.setFullYear(data.getFullYear() + 1);
                }
                
                return this.criarObjetoEvento(data, horario, duracao);
            }
        }

        return null;
    }

    // Criação de objeto de evento
    criarObjetoEvento(data, horario, duracao) {
        const [hora, minuto] = horario.split(':').map(Number);
        const [horasDuracao, minutosDuracao] = duracao.split(':').map(Number);
        
        const inicio = new Date(data);
        inicio.setHours(hora, minuto, 0, 0);
        
        const fim = new Date(inicio);
        fim.setTime(fim.getTime() + (horasDuracao * 60 + minutosDuracao) * 60000);
        
        return { inicio, fim };
    }

    // Cálculo do último dia da semana do mês
    calcularUltimoDiaDoMes(diaDaSemana) {
        const diasSemana = new Map([
            ['segunda', 1], ['terca', 2], ['quarta', 3],
            ['quinta', 4], ['sexta', 5], ['sabado', 6], ['domingo', 0]
        ]);

        const diaNorm = this.normalize(diaDaSemana.replace('-feira', ''));
        const numeroDia = diasSemana.get(diaNorm);
        
        if (numeroDia === undefined) return null;

        const hoje = new Date();
        const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        
        // Encontrar o último dia da semana desejado
        while (ultimoDiaDoMes.getDay() !== numeroDia) {
            ultimoDiaDoMes.setDate(ultimoDiaDoMes.getDate() - 1);
        }
        
        return ultimoDiaDoMes;
    }

    // Criação do contador com estados
    criarContador(elementoEvento, dataEvento, tituloEvento) {
        // Evitar duplicação
        if (elementoEvento.querySelector('.evento-countdown')) return;

        const contador = document.createElement('div');
        contador.className = 'evento-countdown';
        
        const agora = new Date();
        const { inicio: inicioEvento, fim: fimEvento } = dataEvento;
        
        // Verificar estado do evento
        const estado = this.determinarEstadoEvento(agora, inicioEvento, fimEvento);
        
        switch (estado) {
            case 'em-andamento':
                this.renderizarEventoEmAndamento(contador, tituloEvento, fimEvento);
                break;
            case 'encerrado':
                this.renderizarEventoEncerrado(contador, tituloEvento, fimEvento);
                break;
            case 'futuro':
                this.iniciarContadorRegressivo(contador, inicioEvento, tituloEvento);
                break;
        }
        
        elementoEvento.appendChild(contador);
    }

    // Determinar estado do evento
    determinarEstadoEvento(agora, inicio, fim) {
        if (agora >= inicio && agora <= fim) return 'em-andamento';
        if (agora > fim) return 'encerrado';
        return 'futuro';
    }

    // Renderização de estado - evento em andamento
    renderizarEventoEmAndamento(contador, titulo, fimEvento) {
        contador.innerHTML = `
            <div class="evento-acontecendo">
                <h4>🔴 Evento em andamento!</h4>
                <p>O evento "${titulo}" está acontecendo agora.</p>
                <p>Termina às ${this.formatarHora(fimEvento)}</p>
            </div>
        `;
    }

    // Renderização de estado - evento encerrado
    renderizarEventoEncerrado(contador, titulo, fimEvento) {
        contador.innerHTML = `
            <div class="evento-ocorrido">
                <h4>✅ Evento encerrado</h4>
                <p>O evento "${titulo}" foi concluído às ${this.formatarHora(fimEvento)}.</p>
            </div>
        `;
    }

    // Iniciar contador regressivo
    iniciarContadorRegressivo(contador, inicioEvento, titulo) {
        contador.innerHTML = `
            <h4>⏰ Contagem regressiva:</h4>
            <div class="countdown-container">
                <div class="countdown-item">
                    <span class="countdown-value dias">00</span>
                    <span class="countdown-label">Dias</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value horas">00</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value minutos">00</span>
                    <span class="countdown-label">Min</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value segundos">00</span>
                    <span class="countdown-label">Seg</span>
                </div>
            </div>
        `;

        const elementos = {
            dias: contador.querySelector('.dias'),
            horas: contador.querySelector('.horas'),
            minutos: contador.querySelector('.minutos'),
            segundos: contador.querySelector('.segundos')
        };

        const atualizarContador = () => {
            const diferenca = inicioEvento.getTime() - Date.now();
            
            if (diferenca > 0) {
                const tempo = this.calcularTempoRestante(diferenca);
                
                elementos.dias.textContent = tempo.dias;
                elementos.horas.textContent = tempo.horas;
                elementos.minutos.textContent = tempo.minutos;
                elementos.segundos.textContent = tempo.segundos;
            } else {
                clearInterval(intervalo);
                this.renderizarEventoEmAndamento(contador, titulo, new Date(inicioEvento.getTime() + 3600000)); // +1h exemplo
            }
        };

        atualizarContador();
        const intervalo = setInterval(atualizarContador, 1000);
    }

    // Cálculo de tempo restante
    calcularTempoRestante(diferenca) {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        return {
            dias: dias.toString().padStart(2, '0'),
            horas: horas.toString().padStart(2, '0'),
            minutos: minutos.toString().padStart(2, '0'),
            segundos: segundos.toString().padStart(2, '0')
        };
    }

    // Formatação de hora
    formatarHora(data) {
        return `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    }

    // Extração de dados do evento do DOM
    extrairDadosEvento(cartao) {
        const tituloElemento = cartao.querySelector('h3');
        if (!tituloElemento) return null;

        const titulo = tituloElemento.textContent.trim();
        const paragrafos = cartao.querySelectorAll('p');
        
        let dataTexto = '';
        let horarioTexto = '';
        
        for (const p of paragrafos) {
            const texto = p.textContent;
            if (texto.includes('Data:')) {
                dataTexto = texto.replace('Data:', '').trim();
            }
            if (texto.includes('Horário:')) {
                horarioTexto = texto.replace('Horário:', '').trim();
            }
        }

        return { titulo, dataTexto, horarioTexto };
    }

    // Inicialização principal
    inicializar() {
        const cartoes = document.querySelectorAll('.evento-card');
        
        cartoes.forEach((cartao) => {
            try {
                const dadosEvento = this.extrairDadosEvento(cartao);
                if (!dadosEvento?.dataTexto) return;

                const { titulo, dataTexto, horarioTexto } = dadosEvento;
                
                const dataExtraida = this.extrairData(dataTexto);
                if (!dataExtraida) return;
                
                const horario = this.extrairHorario(horarioTexto);
                const duracao = this.extrairDuracao(horarioTexto);
                const dataEvento = this.converterParaDate(dataExtraida, horario, duracao);
                
                if (dataEvento) {
                    this.criarContador(cartao, dataEvento, titulo);
                }
            } catch (error) {
                console.error("Erro ao processar evento:", error, cartao);
            }
        });
    }
}

// Inicialização
function inicializarContadoresEventos() {
    const contador = new EventoContador();
    contador.inicializar();
}

// Auto-inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarContadoresEventos);
} else {
    inicializarContadoresEventos();
}

// Função para adicionar estilos
function adicionarEstilos() {
    // Verificar se os estilos já foram adicionados
    if (document.getElementById('evento-countdown-styles')) return;
    
    const estilos = document.createElement('style');
    estilos.id = 'evento-countdown-styles';
    estilos.textContent = `
        .evento-countdown {
            margin-top: 15px;
        }
        
        .countdown-container {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
        }
        
        .countdown-item {
            text-align: center;
        }
        
        .countdown-value {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .countdown-label {
            font-size: 0.8rem;
        }
        
        .evento-acontecendo {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-top: 10px;
        }
        
        .evento-ocorrido {
            background-color: #9e9e9e;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(estilos);
}

// Inicializar os contadores quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    adicionarEstilos();
    inicializarContadoresEventos();
    
    // Retestar a cada minuto para caso algo mude
    setInterval(inicializarContadoresEventos, 60000);
});