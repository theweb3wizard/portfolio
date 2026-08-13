import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home, ServicesPage, ServiceDetailPage, WorkPage, ProjectDetailPage, AboutPage, InsightsPage, InsightDetailPage, StartPage, LegalPage, NotFoundPage } from "./pages/SitePages";
import { useEffect } from "react";
import { services } from "./site";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services" component={ServicesPage} />
    <Route path="/services/product-builds"><ServiceDetailPage type="productBuilds" /></Route>
    <Route path="/services/prototype-refinement"><ServiceDetailPage type="prototypeRefinement" /></Route>
    <Route path="/services/community-tools"><ServiceDetailPage type="communityTools" /></Route>
    <Route path="/services/application-review"><ServiceDetailPage type="applicationReview" /></Route>
    <Route path="/work" component={WorkPage} />
    <Route path="/work/:slug" component={ProjectDetailPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/insights" component={InsightsPage} />
    <Route path="/insights/:slug" component={InsightDetailPage} />
    <Route path="/start" component={StartPage} />
    <Route path="/privacy"><LegalPage kind="privacy" /></Route>
    <Route path="/terms"><LegalPage kind="terms" /></Route>
    <Route path="/404" component={NotFound} />
    <Route component={NotFoundPage} />
  </Switch>;
}

function MetaManager() {
  const [location] = useLocation();
  useEffect(() => {
    const path = location.split("?")[0];
    const labels: Record<string, [string, string]> = {
      "/": ["Web3 Wizard Labs | Clearer Web3 products, built by one founder.", "Founder-led Web3 product studio for focused products, prototypes, community tools, and application-layer clarity."],
      "/services": ["Web3 product services | Web3 Wizard Labs", "Focused Web3 product builds, prototype refinement, community tools, and bounded application-layer review."],
      "/work": ["Founder-built Web3 work | Web3 Wizard Labs", "Personal Web3 products and experiments built by The Web3 Wizard, clearly labeled and honestly documented."],
      "/about": ["About Web3 Wizard Labs | The Web3 Wizard", "A founder-led studio for making Web3 products clearer through focused scope and direct ownership."],
      "/insights": ["Web3 product insights | Web3 Wizard Labs", "Plain-English thinking about Web3 products, AI-assisted building, scope, and user experience."],
      "/start": ["Start with your idea | Web3 Wizard Labs", "Tell The Web3 Wizard what you are trying to build, where you are stuck, and what a useful first version should do."],
    };
    const service = Object.values(services).find((item) => path === `/services/${item.slug}`);
    const [title, description] = service ? [`${service.label} | Web3 Wizard Labs`, service.description] : (labels[path] ?? ["Web3 Wizard Labs", "Founder-led Web3 product studio."]);
    document.title = title;
    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) { descriptionTag = document.createElement("meta"); descriptionTag.name = "description"; document.head.appendChild(descriptionTag); }
    descriptionTag.content = description;
    const setMeta = (property: string, content: string) => { let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`); if (!tag) { tag = document.createElement("meta"); tag.setAttribute("property", property); document.head.appendChild(tag); } tag.content = content; };
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("og:url", `${window.location.origin}${path}`);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}${path}`;
    let personSchema = document.getElementById("w3w-person-schema") as HTMLScriptElement | null;
    if (!personSchema) { personSchema = document.createElement("script"); personSchema.id = "w3w-person-schema"; personSchema.type = "application/ld+json"; document.head.appendChild(personSchema); }
    personSchema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Khalid - The Web3 Wizard", url: window.location.origin, worksFor: { "@type": "Organization", name: "Web3 Wizard Labs" } });
    let serviceSchema = document.getElementById("w3w-service-schema") as HTMLScriptElement | null;
    if (service) { if (!serviceSchema) { serviceSchema = document.createElement("script"); serviceSchema.id = "w3w-service-schema"; serviceSchema.type = "application/ld+json"; document.head.appendChild(serviceSchema); } serviceSchema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: service.label, description: service.description, provider: { "@type": "Person", name: "Khalid - The Web3 Wizard" } }); } else if (serviceSchema) { serviceSchema.remove(); }
  }, [location]);
  return null;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Analytics /><MetaManager /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
