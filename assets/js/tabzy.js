function Tabzy(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
        console.error(`Tabzy: No container found for selector "${selector}"`);
        return;
    }

    this.tabs = Array.from(this.container.querySelectorAll('li a'));
    if (!this.tabs.length) {
        console.error('Tabzy: No tabs found in the specified container');
        return;
    }

    this.panels = this.getPanels();

    if (this.panels.length !== this.tabs.length) return;

    this.opt = Object.assign({
        activeClassName: "tabzy--active",
        remember: false,
        onChange: null,
    }, options)

    this._cleanRegex = /[^a-zA-Z0-9]/g;

    this.paramKey = selector.replace(this._cleanRegex, '');
    this._originalHTML = this.container.innerHTML;

    this._init();
}

Tabzy.prototype.getPanels = function () {
    return this.tabs.map(tab => {
        const panel = document.querySelector(tab.getAttribute('href'));

        if (!panel) {
            console.error(`Tabzy: No panel found for tab with href "${tab.getAttribute('href')}"`);
            return null;
        }

        return panel;
    }).filter(Boolean);
}

Tabzy.prototype._init = function () {
    const params = new URLSearchParams(location.search);
    const tabSelector = params.get(this.paramKey);

    const tabToActive = (this.opt.remember && tabSelector && this.tabs.find(tab => tab.getAttribute("href").replace(this._cleanRegex, '') === tabSelector)) || this.tabs[0];

    this.currentTab = tabToActive;

    this._activeTab(tabToActive, false, false);

    this.tabs.forEach((tab) => {
        tab.onclick = (event) => {
            event.preventDefault();
            this._tryActivateTab(tab);
        };
    })
}

Tabzy.prototype._tryActivateTab = function (tab) {
    if (this.currentTab !== tab) {
        this._activeTab(tab);
        this.currentTab = tab;
    }
}

Tabzy.prototype._activeTab = function (tab, triggerOnChange = true, updateURL = this.opt.remember) {
    this.tabs.forEach((tab) => {
        tab.closest('li').classList.remove(this.opt.activeClassName);
    })

    tab.closest("li").classList.add(this.opt.activeClassName);

    this.panels.forEach((panel) => {
        panel.hidden = true;
    })

    const panelActive = document.querySelector(tab.getAttribute('href'));
    panelActive.hidden = false;

    if (updateURL) {
        const params = new URLSearchParams(location.search);
        const paramValue = tab.getAttribute('href').replace(this._cleanRegex, '');
        params.set(this.paramKey, paramValue);
        history.replaceState(null, null, `?${params}`);
    }

    if (triggerOnChange && typeof this.opt.onChange === 'function') {
        this.opt.onChange({
            tab,
            panel: panelActive
        });
    }
}

Tabzy.prototype.switch = function (input) {
    const tabToActive = typeof input === "String"
        ? this.tabs.find(tab => tab.getAttribute('href') === input)
        : this.tabs.includes(input)
            ? input
            : null;

    if (!tabToActive) {
        console.error(`Tabzy: No tab found for input "${input}"`);
        return;
    }

    this._tryActivateTab(tab);
}

Tabzy.prototype.destroy = function () {
    this.container.innerHTML = this._originalHTML;
    this.panels.forEach((panel) => {
        panel.hidden = false;
    })

    this.container = null;
    this.tabs = null;
    this.panels = null;
    this.currentTab = null;
}