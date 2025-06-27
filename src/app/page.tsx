"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, ExternalLink, Star, GitFork } from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "@/components/animated-background"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
}

export default function Portfolio() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubRepos()
  }, [])

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/users/JuanCervantesAla/repos?sort=updated&per_page=6"
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from GitHub API")
      }

      // Filtros más relajados
      const filteredRepos = data
        .filter((repo: GitHubRepo) => !repo.fork)
        .map((repo: GitHubRepo) => ({
          ...repo,
          description: repo.description || "No description provided",
          language: repo.language || "Unknown",
          homepage: repo.homepage || "",
        }))
        .slice(0, 6)

      setRepos(filteredRepos)
      setError(null)
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
      setError("Failed to load repositories. Please try again later.")
      setRepos([
        {
          id: 1,
          name: "example-repo",
          description: "Example repository showing when API fails",
          html_url: "#",
          homepage: "",
          language: "TypeScript",
          stargazers_count: 0,
          forks_count: 0,
          topics: ["example"],
          updated_at: new Date().toISOString(),
          fork: false,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/JuanCervantesAla" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/juan-cervantes-9025752b8" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/tu-usuario" },
    { name: "Email", icon: Mail, url: "mailto:juajocervantes16@gmail.com" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/capyflow-logo.png" alt="CapyFlow Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-slate-800">CapyFlow</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About me
              </a>
              <a href="#projects" className="text-slate-600 hover:text-slate-900 transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="sm" asChild>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </header>

        <section id="about" className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">JUAN CERVANTES</h1>
              <h2 className="text-xl md:text-2xl text-slate-600 mb-6">SOFTWARE ENGINEER AND DEVELOPER</h2>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                Full stack developer inspired at creating and innovating ideas. Specialized in Java, Python, Go, React and modern technologies. CapyFlow founder, developing ideas to improve productivity.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <a href="#projects">View projects</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Contact me</a>
                </Button>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-200">
                <Image src="/capyflow-logo.png" alt="CapyFlow Logo" width={140} height={140} className="rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {error || "My recent projects from GitHub"}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-slate-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-slate-200 rounded w-16"></div>
                      <div className="h-6 bg-slate-200 rounded w-12"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <Card key={repo.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-teal-600 transition-colors">
                        {repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </CardTitle>
                      <div className="flex gap-2 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {repo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                      {repo.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" asChild className="flex-1">
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section id="contact" className="bg-slate-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s work together</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              I&apos;m always open to work on big ideas and new impactful projects. Don&apos;t hesitate to contact me!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-5 h-5 mr-2" />
                    {social.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-slate-950 text-slate-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image src="/capyflow-logo.png" alt="CapyFlow Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-semibold text-white">CapyFlow</span>
            </div>
            <p className="text-sm">© 2024 CapyFlow. Developed by Juan Cervantes</p>
          </div>
        </footer>
      </div>
    </div>
  )
}