import $ from "jquery";

export default function reposition() {
    return (
        $(document).ready(function () {
            var img = $(".profileCover profileCoverImg");
            var y1 = $(".profileCover").height();
            var y2 = img.height();
            var x1 = $(".profileCover").width();
            var x2 = img.width();
            var desktop_start_x = 0;
            var desktop_start_y = 0;
            var mobile_start_x = -200;
            var mobile_start_y = -200;
            $(".save").click(function (event) {
                event.preventDefault();
                var t = img.position().top,
                    l = img.position().left;
                img.attr("data-top", t);
                img.attr("data-left", l);
                img.draggable({
                    disabled: true
                });
            });
            $(".reposition").click(function (event) {
                event.preventDefault();
                img.draggable({
                    disabled: false,
                    scroll: false,
                    axis: "y, x",
                    cursor: "move",
                    drag: function (event, ui) {
                        if (ui.position.top >= 0) {
                            ui.position.top = 0;
                        }
                        if (ui.position.top <= y1 - y2) {
                            ui.position.top = y1 - y2;
                        }
                        if (ui.position.left >= 0) {
                            ui.position.left = 0;
                        }
                        if (ui.position.left <= x1 - x2) {
                            ui.position.left = x1 - x2;
                        }
                    }
                });
            });
        })

    )
}