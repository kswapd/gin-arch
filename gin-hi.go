package main

import (
	"fmt"
	"gin-arch/mydata"
	"mime"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

var (
	// Mime types definitions
	extraMimeTypes = map[string]string{
		".icon": "image-x-icon",
		".ttf":  "application/x-font-ttf",
		".woff": "application/x-font-woff",
		".eot":  "application/vnd.ms-fontobject",
		".svg":  "image/svg+xml",
		".html": "text/html; charset-utf-8",
	}

	// Paths that dont require database connection
	allowedPaths = map[string]bool{
		"/api/sessions":  true,
		"/api/info":      true,
		"/api/connect":   true,
		"/api/bookmarks": true,
		"/api/history":   true,
	}

	// List of characters replaced by javascript code to make queries url-safe.
	base64subs = map[string]string{
		"-": "+",
		"_": "/",
		".": "=",
	}
)

func main() {
	r := gin.Default()
	//r.LoadHTMLGlob("html/*")
	/*r.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})*/
	r.GET("/ping", OnPing)
	r.GET("/", GetHome)
	r.GET("/index", GetIndex)
	r.GET("/home", GetHome)
	r.GET("/ping2", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong2",
		})
	})

	r.GET("/html/*path", GetAsset)
	go func() {
		r.Run(":8888") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

	}()
	openPage()
	handleSignals()

}

func handleSignals() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, os.Kill)
	<-c
}
func OnPing(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func assetContentType(name string) string {
	ext := filepath.Ext(name)
	result := mime.TypeByExtension(ext)

	if result == "" {
		result = extraMimeTypes[ext]
	}

	if result == "" {
		result = "text/plain; charset=utf-8"
	}

	return result
}

func serveStaticAsset(path string, c *gin.Context) {
	data, err := mydata.Asset("html" + path)
	if err != nil {
		c.String(400, err.Error())
		return
	}

	c.Data(200, assetContentType(path), data)
}

func GetIndex(c *gin.Context) {
	serveStaticAsset("/index.html", c)
}

func GetHome(c *gin.Context) {
	serveStaticAsset("/home.html", c)
}

func GetAsset(c *gin.Context) {
	serveStaticAsset(c.Params.ByName("path"), c)
}

func openPage() {
	//url := fmt.Sprintf("http://%v:%v/%s", options.HTTPHost, options.HTTPPort, options.Prefix)
	url := "http://localhost:8888"
	fmt.Println("To view database open", url, "in browser")

	_, err := exec.Command("which", "open").Output()
	if err != nil {
		return
	}

	exec.Command("open", url).Output()
}
