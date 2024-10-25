/**
 * Quick-n-dirty ChRIS API client, because the package @fnndsc/chrisapi is not ESM.
 */
import type {
  ChrisPlugin,
  Feed,
  Pipeline,
  PluginInstance,
  Workflow,
} from "$lib/types";

class CubeClient {
  public readonly username: string;
  public readonly password: string;
  public readonly url: string;

  constructor(url: string, username: string, password: string) {
    this.url = url;
    this.username = username;
    this.password = password;
  }

  async runDircopy(paths: ReadonlyArray<string>): Promise<PluginInstance> {
    const params = {
      dir: paths.join(","),
    };
    const dircopy = await this.getDircopy();
    return this.fetch(dircopy.instances, params);
  }

  async createWorkflow(
    pipelineName: string,
    previous: PluginInstance,
    title: string,
  ): Promise<Workflow> {
    const pipeline = await this.getPipeline(pipelineName);
    const payload = {
      previous_plugin_inst_id: previous.id,
      title,
    };
    return await this.fetch(pipeline.workflows, payload);
  }

  async getDircopy(): Promise<ChrisPlugin> {
    return this.search1("plugins", { name_exact: "pl-dircopy" });
  }

  async getPipeline(name: string): Promise<Pipeline> {
    return this.search1("pipelines", { name });
  }

  protected async search1(part: string, data: { [key: string]: string }) {
    const qs = new URLSearchParams({ ...data, limit: "1" }).toString();
    const path = `${part}/search/?${qs}`;
    const res = await this.fetch(path);
    return res.results[0];
  }

  async modifyFeedOf(
    plinst: PluginInstance,
    name: string,
    isPublic: boolean,
  ): Promise<Feed> {
    const payload = {
      name,
      public: isPublic,
    };
    return this.fetch(plinst.feed, payload, "PUT");
  }

  protected async fetch(path: string, data?: any, method?: string) {
    const headers: { [key: string]: string } = {
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
      Accept: "application/json",
    };
    if (data) {
      headers["Content-Type"] = "application/json";
    }
    const url = path.includes("://") ? path : `${this.url}${path}`;
    const res = await fetch(url, {
      method: method ?? (data ? "POST" : "GET"),
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!res.ok) {
      throw new Error(
        `HTTP status: ${res.status} ${res.statusText}. ${await res.text()}`,
      );
    }
    return res.json();
  }
}

export default CubeClient;
